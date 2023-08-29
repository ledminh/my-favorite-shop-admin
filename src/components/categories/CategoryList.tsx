"use client";

import { CategoryResponse, Category as CategoryType, WithID } from "@/types";
import CatProdList, { AddNewButtonType } from "@/components/layout/CatProdList";

import { itemsPerPage } from "@/config";
import { useEffect, useState } from "react";
import NewCategoryModal from "@/components/modals/NewCategory";
import EditCategoryModal from "@/components/modals/EditCategory";
import DeleteCategoryModal from "@/components/modals/DeleteCategory";

import FolderPNG from "@/assets/images/folder.png";

type Props = {
  sortBy: "name" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";
  searchTerm: string;
  initCategories: WithID<CategoryType>[];
  total: number;
};

export default function CategoryList({
  sortBy,
  order,
  searchTerm,
  initCategories,
  total,
}: Props) {
  const [_initCategories, setInitCategories] = useState(initCategories);

  useEffect(() => {
    (async () => {
      const { categories } = await getCategories({
        offset: 0,
        limit: itemsPerPage,
        searchTerm,
        sortBy,
        order,
      });

      setInitCategories(categories);
    })();
  }, [sortBy, order, searchTerm]);

  const getImage = (item: CategoryType) => item.image;

  const onLoadMore = async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => {
    const { categories } = await getCategories({
      offset,
      limit,
      sortBy,
      order,
      searchTerm,
    });

    return categories;
  };

  const addNewButton: AddNewButtonType = {
    text: "Add New Category",
    image: FolderPNG,
  };

  const afterAdd = (newCategory: WithID<CategoryType>) => {
    setInitCategories((prev) => [newCategory, ...prev]);
  };

  const afterEdit = (editedCategory: WithID<CategoryType>) => {
    setInitCategories((prev) =>
      prev.map((category) =>
        category.id === editedCategory.id ? editedCategory : category
      )
    );
  };

  const afterDelete = (deletedCategory: WithID<CategoryType>) => {
    setInitCategories((prev) =>
      prev.filter((category) => category.id !== deletedCategory.id)
    );
  };

  return (
    <CatProdList
      categories={_initCategories}
      initItems={_initCategories}
      total={total}
      CardContent={CardContent}
      addNewButton={addNewButton}
      AddNewModal={NewCategoryModal}
      afterAdd={afterAdd}
      afterEdit={afterEdit}
      afterDelete={afterDelete}
      EditModal={EditCategoryModal}
      DeleteModal={DeleteCategoryModal}
      getImage={getImage}
      onLoadMore={onLoadMore}
    />
  );
}

/**********************
 * Components
 */

type CardContentProps = {
  item: CategoryType;
};

const CardContent = ({ item }: CardContentProps) => (
  <h2 className="text-lg font-semibold">{item.name}</h2>
);

/**************************
 * API
 */
const getCategories = async (props: {
  offset: number;
  limit: number;
  sortBy: "name" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";
  searchTerm: string;
}) => {
  const { offset, limit, sortBy, order, searchTerm } = props;

  const res = await fetch(
    `/api/categories?type=multiple&offset=${offset}&limit=${limit}&sortBy=${sortBy}&order=${order}&searchTerm=${searchTerm}`
  );

  const { errorMessage, data } = (await res.json()) as CategoryResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return {
    categories: data as WithID<CategoryType>[],
  };
};
