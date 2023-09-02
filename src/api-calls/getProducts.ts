import {
  ProductsRequest,
  ProductsResponse,
  WithID,
  Product as ProductType,
} from "@/types";

export default async function getProducts(request: ProductsRequest) {
  const { offset, limit, sortBy, order, catID, searchTerm, filter } = request;

  const res = await fetch(
    `/api/products?type=multiple${offset ? "&offset=" + offset : ""}${
      limit ? "&limit=" + limit : ""
    }&sortBy=${sortBy}&order=${order}&catID=${catID}${
      searchTerm ? "&searchTerm=" + searchTerm : ""
    }${filter ? "&filter=" + filter : ""}`
  );

  const { errorMessage, data } = (await res.json()) as ProductsResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  if (!data) {
    throw new Error("data not found");
  }

  return {
    products: data.products as WithID<ProductType>[],
    total: data.total,
  };
}
