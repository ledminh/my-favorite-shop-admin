"use client";

import { useState } from "react";
import Button from "./Button";

import NewProdModal from "@/components/modals/NewProduct";

export default function NewProdButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>ADD NEW PRODUCT</Button>
      <NewProdModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
