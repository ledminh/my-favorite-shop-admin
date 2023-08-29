import { CategoryResponse, Category as CategoryType, WithID } from "@/types";

const getCategories = async (props: {
  offset?: number;
  limit?: number;
  sortBy: "name" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";
  searchTerm?: string;
}) => {
  const { offset, limit, sortBy, order, searchTerm } = props;

  const res = await fetch(
    `/api/categories?type=multiple${offset ? "&offset=" + offset : ""}${
      limit ? "&limit=" + limit : ""
    }&sortBy=${sortBy}&order=${order}${
      searchTerm ? "&searchTerm=" + searchTerm : ""
    }`
  );

  const { errorMessage, data } = (await res.json()) as CategoryResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return {
    categories: data as WithID<CategoryType>[],
  };
};

export default getCategories;
