"use client";

import { Category as CategoryType, WithID } from "@/types";
import { getCategories } from "@/data/categories";
import CatProdList from "@/components/layout/CatProdList";

type Props = {
  initCategories: WithID<CategoryType>[];
  total: number;
  sortBy: "name" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";
};

export default async function CategoryList({
  initCategories,
  total,
  sortBy,
  order,
}: Props) {
  const onEdit = (id: string) => {
    console.log(`Edit category with id ${id}`);
  };

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
    <CatProdList
      initItems={initCategories}
      total={total}
      ItemTabContent={Content}
      onEdit={onEdit}
      onDelete={onDelete}
      getImage={getImage}
      onLoadMore={onLoadMore}
    />
  );
}

/**********************
 * Components
 */

type ContentProps = {
  item: CategoryType;
};

const Content = ({ item }: ContentProps) => (
  <h2 className="text-lg font-semibold">{item.name}</h2>
);
