"use client";

import { Category as CategoryType, WithID } from "@/types";
import { getCategories } from "@/data/categories";
import CatProdList from "@/components/layout/CatProdList";

import { itemsPerPage } from "@/config";
import { useEffect, useState } from "react";
import EditCategoryModal from "@/components/modals/EditCategory";
import DeleteCategoryModal from "@/components/modals/DeleteCategory";

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
      const { items } = await getCategories({
        offset: 0,
        limit: itemsPerPage,
        searchTerm,
        sortBy,
        order,
      });

      setInitCategories(items);
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
    const { items } = await getCategories({
      offset,
      limit,
      sortBy,
      order,
      searchTerm,
    });

    return items;
  };

  return (
    <>
      <CatProdList
        initItems={_initCategories}
        total={total}
        CardContent={CardContent}
        EditModal={EditCategoryModal}
        DeleteModal={DeleteCategoryModal}
        getImage={getImage}
        onLoadMore={onLoadMore}
      />
    </>
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
