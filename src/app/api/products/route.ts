import add from "./add";
import edit from "./edit";
import del from "./del";

import getMultiple from "./getMultiple";
// import getSingle from "./getSingle";

import { ProductResponse, ProductsResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ProductResponse>> {
  try {
    const action = request.nextUrl.searchParams.get("action");

    switch (action) {
      case "add":
        return add(request);
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
): Promise<NextResponse<ProductResponse | ProductsResponse>> {
  try {
    const type = request.nextUrl.searchParams.get("type");

    if (type === "multiple") {
      return getMultiple(request) as Promise<NextResponse<ProductsResponse>>;
    } else {
      throw new Error("type not found");
    }
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
