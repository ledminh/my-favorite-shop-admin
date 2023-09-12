"use client";

import { Category as CategoryType, WithID } from "@/types";
import CatProdList, { AddNewButtonType } from "@/components/layout/CatProdList";

import getCategories from "@/api-calls/getCategories";

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
  const [_initCategories, setInitCategories] = useState(initCategories || []);
  const [_total, setTotal] = useState(total);

  useEffect(() => {
    (async () => {
      const { categories, total } = await getCategories({
        offset: 0,
        limit: itemsPerPage,
        searchTerm,
        sortBy,
        order,
      });

      setInitCategories(categories);
      setTotal(total);
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
    setTotal((prev) => prev + 1);
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
    setTotal((prev) => prev - 1);
  };

  return (
    <CatProdList
      categories={_initCategories}
      initItems={_initCategories}
      total={_total}
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
