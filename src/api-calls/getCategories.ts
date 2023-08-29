import {
  CategoriesRequest,
  CategoriesResponse,
  CategoryResponse,
  Category as CategoryType,
  WithID,
} from "@/types";

const getCategories = async (req: CategoriesRequest) => {
  const { offset, limit, sortBy, order, searchTerm } = req;

  const res = await fetch(
    `/api/categories?type=multiple${offset ? "&offset=" + offset : ""}${
      limit ? "&limit=" + limit : ""
    }&sortBy=${sortBy}&order=${order}${
      searchTerm ? "&searchTerm=" + searchTerm : ""
    }`
  );

  const { errorMessage, data } = (await res.json()) as CategoriesResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return {
    categories: data as WithID<CategoryType>[],
  };
};

export default getCategories;
