import { NextResponse } from "next/server";

// Use env variable for MCP port
const MCP_PORT = process.env.NEXT_PUBLIC_MCP_PORT || 3001;

export async function POST(req: Request) {
  const { url, chartType } = await req.json();

  try {
    // Call MCP backend for chart creation
    const res = await fetch(`http://localhost:${MCP_PORT}/api/mcp/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: "create_chart",
        args: {
          url,
          chartType,
          name: "Chart Name",
          event: "generate_chart_clicked",
        },
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      chart: data.result,
    });
  } catch (err: any) {
    console.error("❌ Failed to generate chart:", err.message || err);
    return NextResponse.json(
      { chart: null, error: "Failed to generate chart" },
      { status: 500 }
    );
  }
}
