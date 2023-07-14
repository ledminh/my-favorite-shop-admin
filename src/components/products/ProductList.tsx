"use client";

import { Product, Product as ProductType, WithID } from "@/types";
import CatProdList from "@/components/layout/CatProdList";

import { getProducts } from "@/data/products";

type Props = {
  initProducts: WithID<Product>[];
  total: number;
  sortBy: "name" | "price" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";
  filters: {
    variants?: boolean;
    promotion?: boolean;
    catID?: string;
    searchTerm?: string;
  };
};

export default async function ProductList({
  initProducts,
  total,
  filters,
  sortBy,
  order,
}: Props) {
  const onEdit = (id: string) => {
    console.log(`Edit product with id ${id}`);
  };

  const onDelete = (id: string) => {
    console.log(`Delete product with id ${id}`);
  };

  const getImage = (item: ProductType) => {
    const mainImage = item.images.find(
      (image) => image.id === item.mainImageID
    );

    if (!mainImage) {
      throw new Error("Main image not found");
    }

    return mainImage;
  };

  const onLoadMore = async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => {
    const { items } = await getProducts({
      offset,
      limit,
      filters,
      sortBy,
      order,
    });

    return items;
  };

  return (
    <CatProdList
      initItems={initProducts}
      total={total}
      ItemTabContent={Content}
      onEdit={onEdit}
      onDelete={onDelete}
      getImage={getImage}
      onLoadMore={onLoadMore}
    />
  );
}

/*************************
 * Components
 */

type ContentProps = {
  item: ProductType;
};
const Content = ({ item }: ContentProps) => (
  <h2 className="text-lg font-semibold">{item.name}</h2>
);
