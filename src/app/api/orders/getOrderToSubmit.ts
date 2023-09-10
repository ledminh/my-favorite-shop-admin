import { NextRequest, NextResponse } from "next/server";
import { getOrderToSubmit as getOrderToSubmitDB } from "@/data/orders";

export default async function getOrderToSubmit(request: NextRequest) {
  const sessionID = request.nextUrl.searchParams.get("sessionID");

  if (!sessionID) throw new Error("sessionID not found");

  const orderToSubmit = await getOrderToSubmitDB(sessionID);

  return NextResponse.json({
    data: orderToSubmit,
  });
}
