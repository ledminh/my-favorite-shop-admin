import { MessagesResponse, MessageResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// import add from "./add";
import del from "./del";
import edit from "./edit";
import getMultiple from "./getMultiple";

export async function POST(
  request: NextRequest
): Promise<NextResponse<MessageResponse>> {
  try {
    const action = request.nextUrl.searchParams.get("action");

    switch (action) {
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
): Promise<NextResponse<MessageResponse | MessagesResponse>> {
  try {
    const type = request.nextUrl.searchParams.get("type");

    if (type === "multiple") {
      return getMultiple(request);
    } else {
      throw new Error("type not found");
    }
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
