import { NextRequest, NextResponse } from "next/server";

import { OrderStatus } from "@/types";

import { updateOrder } from "@/data/orders";

export default async function edit(request: NextRequest) {
  const { id, status } = (await request.json()) as {
    id: string;
    status: OrderStatus;
  };

  const updatedOrder = await updateOrder(id, status);

  return NextResponse.json({
    data: {
      ...updatedOrder,
      createdAt: updatedOrder.createdAt.toISOString(),
      modifiedAt: updatedOrder.modifiedAt.toISOString(),
    },
  });
}
