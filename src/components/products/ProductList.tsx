"use client";

import { useState, useEffect } from "react";

import { itemsPerPage } from "@/config";
import { Product, Product as ProductType, WithID } from "@/types";
import CatProdList from "@/components/layout/CatProdList";

import EditProductModal from "@/components/modals/EditProduct";
import DeleteProductModal from "@/components/modals/DeleteProduct";

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

export default function ProductList({
  initProducts,
  total,
  filters,
  sortBy,
  order,
}: Props) {
  const [_initProducts, setInitProducts] = useState(initProducts);

  useEffect(() => {
    (async () => {
      const { items } = await getProducts({
        offset: 0,
        limit: itemsPerPage,
        sortBy,
        order,
      });

      setInitProducts(items);
    })();
  }, [sortBy, order]);

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
      initItems={_initProducts}
      total={total}
      CardContent={CardContent}
      EditModal={EditProductModal}
      DeleteModal={DeleteProductModal}
      getImage={getImage}
      onLoadMore={onLoadMore}
    />
  );
}

/*************************
 * Components
 */

type CardContentProps = {
  item: ProductType;
};
const CardContent = ({ item }: CardContentProps) => (
  <h2 className="text-lg font-semibold">{item.name}</h2>
);
