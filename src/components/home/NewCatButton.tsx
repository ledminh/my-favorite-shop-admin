"use client";

import { WithID, Category } from "@/types";
import { useState } from "react";
import Button from "./Button";
import NewCatModal from "@/components/modals/NewCategory";

export default function NewCatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const afterAdd = (item: WithID<Category>) => {
    console.log(item);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>ADD NEW CATEGORY</Button>
      <NewCatModal isOpen={isOpen} setIsOpen={setIsOpen} afterAdd={afterAdd} />
    </>
  );
}
