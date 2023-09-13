import { NextRequest, NextResponse } from "next/server";

import { deleteOrder } from "@/data/orders";

export default async function del(request: NextRequest) {
  const { id } = await request.json();

  const deletedOrder = await deleteOrder(id);

  return NextResponse.json({
    data: deletedOrder,
  });
}
