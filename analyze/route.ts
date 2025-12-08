import { NextResponse } from "next/server";

// Forward request to backend (Python MCP/Node server)
export async function POST(req: Request) {
  const { url } = await req.json();

  // Temporary mock until backend is ready
  return NextResponse.json({
    chart: {
      url,
      status: "success",
      message: "Chart generated successfully (placeholder)",
      points: [
        { name: "Visitors", value: 120 },
        { name: "Conversions", value: 45 }
      ]
    }
  });
}
