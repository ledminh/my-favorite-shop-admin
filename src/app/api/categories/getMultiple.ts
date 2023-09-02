import { NextRequest, NextResponse } from "next/server";
import { getCategories } from "@/data/categories";

import { CategoriesRequest } from "@/types";

export default async function getMultiple(request: NextRequest) {
  const offsetStr = request.nextUrl.searchParams.get("offset");
  const limitStr = request.nextUrl.searchParams.get("limit");
  const sortByStr = request.nextUrl.searchParams.get("sortBy");
  const orderStr = request.nextUrl.searchParams.get("order");
  const searchTermStr = request.nextUrl.searchParams.get("searchTerm");

  if (!sortByStr) {
    throw new Error("sortBy is required");
  }

  if (!orderStr) {
    throw new Error("order is required");
  }

  const { items: categories, total } = await getCategories({
    offset: offsetStr ? parseInt(offsetStr) : undefined,
    limit: limitStr ? parseInt(limitStr) : undefined,
    sortBy: sortByStr as CategoriesRequest["sortBy"],
    order: orderStr as CategoriesRequest["order"],
    searchTerm: searchTermStr ? searchTermStr : undefined,
  });

  return NextResponse.json({
    data: {
      categories,
      total,
    },
  });
}
