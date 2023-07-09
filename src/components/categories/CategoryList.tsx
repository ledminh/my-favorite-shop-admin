"use client";

import CategoryTab from "@/components/categories/CategoryTab";
import { getCategories } from "@/data/categories";

export default async function CategoryList() {
  const { items, total } = await getCategories();

  return (
    <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-between">
      {items.map((category) => {
        return (
          <li
            key={category.id}
            className="overflow-hidden border rounded-lg border-blue-950"
          >
            <CategoryTab
              category={category}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </li>
        );
      })}
    </ul>
  );
}
