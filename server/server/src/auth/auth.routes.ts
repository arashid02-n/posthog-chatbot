import express from "express";
import { signup, login } from "./auth.controller";
import passport from "passport";

const router = express.Router();

// Normal signup/login
router.post("/signup", signup);
router.post("/login", login);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as any;
    res.redirect(`/success?token=${user.token}`);
  }
);

export default router;
