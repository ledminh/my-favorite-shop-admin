"use client";

import { ReactNode } from "react";
import { WithID, Category as CategoryType } from "@/types";

import { useState } from "react";

import CategoryListModal from "@/components/modals/CategoryList";

type Props = {
  categories: WithID<CategoryType>[];
  initCatID: string;
};

export default function Category({ categories, initCatID }: Props) {
  const [currentCategory, setCurrentCategory] = useState(
    categories.find((c) => c.id === initCatID) || null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (catID: string | null) => {
    setCurrentCategory(categories.find((c) => c.id === catID) || null);
  };

  return (
    <Wrapper>
      <H2>{currentCategory?.name || "ALL"}</H2>
      <ChangeButton label="Change" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <CategoryListModal
          categories={categories}
          onChange={onChange}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </Wrapper>
  );
}

/************************
 * Styles
 */
const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-start gap-4 pb-1 border-b border-blue-950">
    {children}
  </div>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-bold text-blue-950">{children}</h2>
);

/**********************
 * Components
 */
const ChangeButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    className="p-1 text-white bg-blue-900 border border-black hover:bg-blue-950"
    onClick={onClick}
  >
    {label}
  </button>
);
