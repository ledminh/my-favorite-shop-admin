export default function getProducts(props: {
  offset?: number;
  limit?: number;

  sortBy: "name" | "price" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";

  catID: string;
  searchTerm?: string;

  filter: "with-variants" | "with-promotion" | null;
}) {
  const { offset, limit, sortBy, order, searchTerm } = props;

  return fetch(
    `/api/products?type=multiple${offset ? "&offset=" + offset : ""}${
      limit ? "&limit=" + limit : ""
    }&sortBy=${sortBy}&order=${order}${
      searchTerm ? "&searchTerm=" + searchTerm : ""
    }`
  );
}
