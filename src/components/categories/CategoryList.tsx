"use client";

import { Category as CategoryType, WithID } from "@/types";
import { getCategories } from "@/data/categories";
import Image from "next/image";
import { ReactNode } from "react";

export default async function CategoryList() {
  const { items, total } = await getCategories();

  return (
    <ul className="flex flex-col gap-4">
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

/******************************
 * Components
 */
type CategoryTabProps = {
  category: WithID<CategoryType>;
  onEdit: () => void;
  onDelete: () => void;
};

const CategoryTab = ({ category, onEdit, onDelete }: CategoryTabProps) => {
  const { name, image } = category;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative h-20 basis-20">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{name}</h2>
        <div className="flex items-center justify-start gap-2">
          <Button
            onClick={onEdit}
            className="text-white bg-blue-950 hover:bg-blue-950/90"
          >
            EDIT
          </Button>
          <Button
            onClick={onDelete}
            className="text-white bg-red-950 hover:bg-red-950/90"
          >
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
};

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`px-2 py-1 text-sm ${className}`}>
      {children}
    </button>
  );
};
