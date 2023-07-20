"use client";

import { useState } from "react";
import Button from "./Button";

import NewProdModal from "@/components/modals/NewProduct";
import { Category, WithID } from "@/types";

type Props = {
  categories: WithID<Category>[];
};

export default function NewProdButton({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>ADD NEW PRODUCT</Button>
      <NewProdModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categories={categories}
      />
    </>
  );
}
