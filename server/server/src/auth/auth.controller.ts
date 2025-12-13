import { prisma } from "../../prisma/prisma.config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// SIGNUP
export const signup = async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  if (!username || !email || !password || !repeatPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!pwdRegex.test(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters long and contain letters and numbers" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { username, email, passwordHash: hash },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Username or email already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
};

