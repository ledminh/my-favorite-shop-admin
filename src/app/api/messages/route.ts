import { CustomerMessageStatus, OrderStatus } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  console.log("DELETE", id);

  return NextResponse.json({ status: "ok", text: `Deleted` });
}

export async function PATCH(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const body: { status: CustomerMessageStatus } = await request.json();

  const { status } = body;

  console.log("PATCH", id, status);

  return NextResponse.json({ status: "ok", text: "patch done" });
}
