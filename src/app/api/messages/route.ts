import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  console.log("DELETE", request.body);

  NextResponse.json({ status: "ok", text: `Deleted` });
}

export async function PATCH(request: NextRequest) {
  console.log("PATCH", request.body);

  NextResponse.json({ status: "ok", text: `Updated` });
}
