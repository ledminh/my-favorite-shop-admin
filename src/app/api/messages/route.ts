import { deleteMessage, updateMessage } from "@/data/customerMessages";
import {
  CustomerMessageStatus,
  DeleteMessageResponse,
  UpdateMessageResponse,
} from "@/types";

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

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<UpdateMessageResponse>> {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      throw new Error("id not found");
    }
    const body: { status: CustomerMessageStatus } = await request.json();

    const { status } = body;

    const customerMessage = await updateMessage(id, status);

    return NextResponse.json({ data: customerMessage });
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
