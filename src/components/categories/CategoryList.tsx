"use client";

import { Category as CategoryType, WithID } from "@/types";
import { getCategories } from "@/data/categories";
import CatProdList from "@/components/layout/CatProdList";

import { itemsPerPage } from "@/config";
import { useEffect, useState } from "react";
import EditCategoryModal from "../modals/EditCategory";

type Props = {
  sortBy: "name" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";
  initCategories: WithID<CategoryType>[];
  total: number;
};

export default function CategoryList({
  sortBy,
  order,
  initCategories,
  total,
}: Props) {
  const [_initCategories, setInitCategories] = useState(initCategories);

  useEffect(() => {
    (async () => {
      const { items } = await getCategories({
        offset: 0,
        limit: itemsPerPage,
        sortBy,
        order,
      });

      setInitCategories(items);
    })();
  }, [sortBy, order]);

  const onDelete = (id: string) => {
    console.log(`Delete category with id ${id}`);
  };

  const getImage = (item: CategoryType) => item.image;

  const onLoadMore = async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => {
    const { items } = await getCategories({ offset, limit, sortBy, order });

    return items;
  };

  return (
    <>
      <CatProdList
        initItems={_initCategories}
        total={total}
        CardContent={CardContent}
        EditModal={EditCategoryModal}
        onDelete={onDelete}
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
