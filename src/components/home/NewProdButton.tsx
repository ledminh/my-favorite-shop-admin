"use client";

import AddNewButton from "./AddNewButton";

import NewProdModal from "@/components/modals/NewProduct";
import { Category, Product, WithID } from "@/types";

import Image from "next/image";
import { useEffect, useState } from "react";

import getCategories from "@/api-calls/getCategories";

export default function NewProdButton() {
  const [categories, setCategories] = useState<WithID<Category>[]>([]);

  useEffect(() => {
    getCategories({ sortBy: "name", order: "asc" }).then(({ categories }) =>
      setCategories(categories)
    );
  }, []);

  return categories.length > 0 ? (
    <AddNewButton
      title="ADD NEW PRODUCT"
      NewModal={NewProdModal}
      notificationTitle="Product Added"
      NotificationContent={NotificationContent}
      categories={categories}
    />
  ) : (
    <div className="flex items-center justify-center">
      <span className="text-sm text-black">Loading...</span>
    </div>
  );
}

/**************************
 * Components
 */

const NotificationContent = ({ item }: { item: WithID<Product> }) => {
  return (
    <div className="flex items-center justify-start gap-4 mt-2">
      <div className="relative w-20 h-20 overflow-hidden rounded-2xl">
        <Image
          src={item.images[0].src}
          alt={item.images[0].alt}
          fill
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-white">{item.name}</span>
        <span className="text-xs text-white">
          {item.description.length > 20
            ? item.description.substring(0, 20) + "..."
            : item.description}
        </span>
      </div>
    </div>
  );
};
