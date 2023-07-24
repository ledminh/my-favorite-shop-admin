import { DeleteOrderResponse, UpdateOrderResponse, OrderStatus } from "@/types";
import { NextRequest, NextResponse } from "next/server";

import { deleteOrder, updateOrder } from "@/data/orders";

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<DeleteOrderResponse>> {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      throw new Error("id not found");
    }

    const order = await deleteOrder(id);

    return NextResponse.json({ data: order });
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<UpdateOrderResponse>> {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      throw new Error("id not found");
    }

    const body: { status: OrderStatus } = await request.json();

    const { status } = body;

    const order = await updateOrder(id, status);

    return NextResponse.json({ data: order });
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
