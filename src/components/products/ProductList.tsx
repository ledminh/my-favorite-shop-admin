"use client";

import { useState, useEffect } from "react";

import CardContent from "@/components/products/CardContent";

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
  filter: "with-variants" | "with-promotion" | null;
  catID: string;
  searchTerm: string;
};

export default function ProductList({
  initProducts,
  total,
  filter,
  catID,
  searchTerm,
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
        filter,
        catID,
        searchTerm,
      });

      setInitProducts(items);
    })();
  }, [sortBy, order, filter, catID, searchTerm]);

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
      filter,
      catID,
      searchTerm,
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
