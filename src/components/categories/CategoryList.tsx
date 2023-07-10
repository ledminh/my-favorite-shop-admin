"use client";

import CategoryTab from "@/components/categories/CategoryTab";
import { getCategories } from "@/data/categories";

export default async function CategoryList() {
  const { items, total } = await getCategories();

  return (
    <ul className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-start md:gap-x-[4%] lg:gap-x-[3.5%] xl:gap-x-[2.66%]">
      {items.map((category) => {
        return (
          <li
            key={category.id}
            className="overflow-hidden border rounded-lg border-blue-950 md:basis-[48%] lg:basis-[31%] xl:basis-[23%]"
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
