import { CategoriesResponse, CategoryResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

import add from "./add";
import del from "./del";
import edit from "./edit";
import getMultiple from "./getMultiple";
import getSingle from "./getSingle";

export async function POST(
  request: NextRequest
): Promise<NextResponse<CategoryResponse>> {
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
): Promise<NextResponse<CategoryResponse | CategoriesResponse>> {
  try {
    const type = request.nextUrl.searchParams.get("type");

    switch (type) {
      case "single":
        return getSingle(request);
      case "multiple":
        return getMultiple(request);

      default:
        throw new Error("type not found");
    }
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
