import { NextRequest, NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";
import deleteImages from "@/utils/deleteImages";

import getID from "@/utils/getID";
import { updateCategory, getCategory } from "@/data/categories";

import isValidJSON from "@/utils/isValidJSON";

import { OrderStatus, WithID } from "@/types";

import { updateOrder } from "@/data/orders";

export default async function edit(request: NextRequest) {
  const { id, status } = (await request.json()) as {
    id: string;
    status: OrderStatus;
  };

  const updatedOrder = await updateOrder(id, status);

  return NextResponse.json({
    data: updatedOrder,
  });
}
