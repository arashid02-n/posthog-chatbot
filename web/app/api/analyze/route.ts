import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/mcp/run`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: "create_chart",
        args: {
          name: "Generate Button Clicks",
          event: "generate_chart_clicked",
          chartType: body.chartType || "line",
        },
      }),
    }
  );

  const data = await res.json();

  return NextResponse.json({
    chart: {
      status: "success",
      insightUrl: data?.result?.url,
      insightId: data?.result?.insightId,
    },
  });
}
