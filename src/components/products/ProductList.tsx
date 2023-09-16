"use client";

import { useState, useEffect } from "react";

import getCategories from "@/api-calls/getCategories";
import getProducts from "@/api-calls/getProducts";

import CardContent from "@/components/products/CardContent";

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

import ParcelPNG from "@/assets/images/parcel.png";

type Props = {
  initProducts: WithID<Product>[];
  initTotal: number;
  sortBy: "name" | "price" | "createdAt" | "modifiedAt";
  order: "asc" | "desc";
  filter: "with-variants" | "with-promotion" | null;
  catID: string;
  searchTerm: string;
};

export default function ProductList({
  initProducts,
  initTotal,
  filter,
  catID,
  searchTerm,
  sortBy,
  order,
}: Props) {
  const [_initProducts, setInitProducts] = useState(initProducts);
  const [categories, setCategories] = useState<WithID<CategoryType>[]>([]);

  const [total, setTotal] = useState(initTotal);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { categories } = await getCategories({
        sortBy: "name",
        order: "asc",
      });

      setCategories(categories);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { products, total } = await getProducts({
        offset: 0,
        limit: itemsPerPage,
        sortBy,
        order,
        filter,
        catID,
        searchTerm,
      });

      setTotal(total);
      setInitProducts(products);
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
    const { products } = await getProducts({
      offset,
      limit,
      filter,
      catID,
      searchTerm,
      sortBy,
      order,
    });

    return products;
  };

  const addNewButton: AddNewButtonType = {
    text: "Add New Product",
    image: ParcelPNG,
  };

  const afterAdd = (newProduct: WithID<ProductType>) => {
    setInitProducts((prev) => [newProduct, ...prev]);
    setTotal((prev) => prev + 1);
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

    setTotal((prev) => prev - 1);
  };

  return (
    <CatProdList
      loading={loading}
      setLoading={setLoading}
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
