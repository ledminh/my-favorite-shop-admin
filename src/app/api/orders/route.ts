import { OrdersResponse, SubmitOrderResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// import submit from "./submit";
import del from "./del";
import edit from "./edit";
import getMultiple from "./getMultiple";

export async function POST(
  request: NextRequest
): Promise<NextResponse<SubmitOrderResponse>> {
  try {
    const action = request.nextUrl.searchParams.get("action");

    switch (action) {
      // case "submit": // submit to temporary orders to proceed to checkout
      //   return submit(request);
      case "edit":
        return edit(request);
      case "delete":
        return del(request);

      default:
        throw new Error("action not found");
    }
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<OrdersResponse>> {
  try {
    const type = request.nextUrl.searchParams.get("type");

    switch (type) {
      case "multiple":
        return getMultiple(request);

      default:
        throw new Error("type not found");
    }
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
