import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/data/products/mock-data";

export default async function getSingle(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) throw new Error("id is required");

  const product = await getProduct({
    id,
  });
  return NextResponse.json({
    data: product,
  });
}
