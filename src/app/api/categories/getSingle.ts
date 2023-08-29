import { NextRequest, NextResponse } from "next/server";
import { getCategory } from "@/data/categories";

export default async function getSingle(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const slug = request.nextUrl.searchParams.get("slug");

  const category = await getCategory({
    id: id ? id : undefined,
    slug: slug ? slug : undefined,
  });

  return NextResponse.json({
    data: category,
  });
}
