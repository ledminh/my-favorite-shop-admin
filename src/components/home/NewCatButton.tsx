"use client";

import { useState } from "react";
import Button from "./Button";
import NewCatModal from "@/components/Modals/NewCategory";

export default function NewCatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>ADD NEW CATEGORY</Button>
      <NewCatModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
