"use client";

import { useState } from "react";
import Button from "./Button";
import NewCatModal from "@/components/NewCatModal";

export default function NewCatButton() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>ADD NEW CATEGORY</Button>
      <NewCatModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
