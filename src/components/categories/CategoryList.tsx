"use client";

import { Category as CategoryType } from "@/types";
import { getCategories } from "@/data/categories";
import CatProdList from "@/components/layout/CatProdList";

export default async function CategoryList() {
  const { items, total } = await getCategories();

  const onEdit = (id: string) => {
    console.log(`Edit category with id ${id}`);
  };

  const onDelete = (id: string) => {
    console.log(`Delete category with id ${id}`);
  };

  const getImage = (item: CategoryType) => item.image;

  const onLoadMore = () => {
    console.log("Load more categories");
  };

  return (
    <CatProdList
      items={items}
      total={total}
      ItemTabContent={Content}
      onEdit={onEdit}
      onDelete={onDelete}
      getImage={getImage}
      onLoadMore={onLoadMore}
    />
  );
}

type ContentProps = {
  item: CategoryType;
};
const Content = ({ item }: ContentProps) => (
  <h2 className="text-lg font-semibold">{item.name}</h2>
);
