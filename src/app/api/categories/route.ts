import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("POST", request.body);

  NextResponse.json({ status: "ok", text: `Posted` });
}
