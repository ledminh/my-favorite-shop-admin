"use client";

import { useState, useEffect } from "react";

import CardContent from "@/components/products/CardContent";
import { getCategories } from "@/data/categories";

import { itemsPerPage } from "@/config";
import {
  Product,
  Product as ProductType,
  Category as CategoryType,
  WithID,
} from "@/types";
import CatProdList, { AddNewButtonType } from "@/components/layout/CatProdList";
import NewProductModal from "@/components/modals/NewProduct";

import EditProductModal from "@/components/modals/EditProduct";
import DeleteProductModal from "@/components/modals/DeleteProduct";

import { getProducts } from "@/data/products";

import ParcelPNG from "@/assets/images/parcel.png";

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
  const [categories, setCategories] = useState<WithID<CategoryType>[]>([]);

  useEffect(() => {
    (async () => {
      const { items } = await getCategories({
        sortBy: "name",
        order: "asc",
      });

      setCategories(items);
    })();
  }, []);

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

  const addNewButton: AddNewButtonType = {
    text: "Add New Product",
    image: ParcelPNG,
  };

  const afterAdd = (newProduct: WithID<ProductType>) => {
    setInitProducts((prev) => [newProduct, ...prev]);
  };

  const afterEdit = (editedProduct: WithID<ProductType>) => {
    setInitProducts((prev) =>
      prev.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
  };

  const afterDelete = (deletedProduct: WithID<ProductType>) => {
    setInitProducts((prev) =>
      prev.filter((product) => product.id !== deletedProduct.id)
    );
  };

  return (
    <CatProdList
      initItems={_initProducts}
      total={total}
      CardContent={CardContent}
      addNewButton={addNewButton}
      categories={categories}
      afterAdd={afterAdd}
      afterEdit={afterEdit}
      afterDelete={afterDelete}
      AddNewModal={NewProductModal}
      EditModal={EditProductModal}
      DeleteModal={DeleteProductModal}
      getImage={getImage}
      onLoadMore={onLoadMore}
    />
  );
}
