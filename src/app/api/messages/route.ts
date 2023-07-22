import { deleteMessage } from "@/data/customerMessages";
import { CustomerMessageStatus, DeleteMessageResponse } from "@/types";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<DeleteMessageResponse>> {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      throw new Error("id not found");
    }

    const customerMessage = await deleteMessage(id);

    return NextResponse.json({ data: customerMessage });
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}

export async function PATCH(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const body: { status: CustomerMessageStatus } = await request.json();

  const { status } = body;

  console.log("PATCH", id, status);

  return NextResponse.json({ status: "ok", text: "patch done" });
}
