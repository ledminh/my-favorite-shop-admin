"use client";

import { ReactNode } from "react";
import { WithID, Category as CategoryType } from "@/types";

import { useSearchParams } from "next/navigation";

import ChangeCategoryButton from "@/components/products/ChangeCategoryButton";

type Props = {
  categories: WithID<CategoryType>[];
};

export default function Category({ categories }: Props) {
  const searchParams = useSearchParams();
  const catID = searchParams.get("catID");

  if (catID === null) {
    return (
      <Wrapper>
        <H2>ALL</H2>
        <div>
          <ChangeCategoryButton categories={categories} />
        </div>
      </Wrapper>
    );
  }

  const category = categories.find((c) => c.id === catID);

  if (!category) {
    throw new Error(`Category with id ${catID} not found`);
  }

  return (
    <Wrapper>
      <H2>{category.name}</H2>
      <div>
        <ChangeCategoryButton categories={categories} />
      </div>
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
