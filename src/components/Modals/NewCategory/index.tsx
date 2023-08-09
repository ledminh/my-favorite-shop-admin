"use client";

import { WithID, Category } from "@/types";

import useNewCatModal from "./hooks";
import CategoryModal from "../Category";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterAdd: (item: WithID<Category>) => void;
};

export default function NewCatModal({ isOpen, setIsOpen, afterAdd }: Props) {
  const { submitButton, onAdd } = useNewCatModal();
  return (
    <CategoryModal
      type="add"
      title="Add New Category"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitButton={submitButton}
      onSubmit={onAdd}
      afterSubmit={afterAdd}
    />
  );
}
