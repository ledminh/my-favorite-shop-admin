import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/data/products";

import { ProductsRequest } from "@/types";

export default async function getMultiple(request: NextRequest) {
  const offsetStr = request.nextUrl.searchParams.get("offset");
  const limitStr = request.nextUrl.searchParams.get("limit");
  const sortByStr = request.nextUrl.searchParams.get("sortBy");
  const catID = request.nextUrl.searchParams.get("catID");
  const orderStr = request.nextUrl.searchParams.get("order");
  const searchTermStr = request.nextUrl.searchParams.get("searchTerm");
  const filterStr = request.nextUrl.searchParams.get("filter");

  if (!catID) {
    throw new Error("catID is required");
  }

  if (!sortByStr) {
    throw new Error("sortBy is required");
  }

  if (!orderStr) {
    throw new Error("order is required");
  }

  if (!filterStr) {
    throw new Error("filter is required");
  }

  const { items: products } = await getProducts({
    offset: offsetStr ? parseInt(offsetStr) : undefined,
    limit: limitStr ? parseInt(limitStr) : undefined,
    sortBy: sortByStr as ProductsRequest["sortBy"],
    order: orderStr as ProductsRequest["order"],
    catID: catID,
    searchTerm: searchTermStr ? searchTermStr : undefined,
    filter: filterStr !== "" ? (filterStr as ProductsRequest["filter"]) : null,
  });

  return NextResponse.json({
    data: products,
  });
}
