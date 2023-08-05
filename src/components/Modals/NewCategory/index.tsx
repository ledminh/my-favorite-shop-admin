"use client";

import useNewCatModal from "./hooks";
import CategoryModal from "../Category";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function NewCatModal({ isOpen, setIsOpen }: Props) {
  const { submitButton, onAdd } = useNewCatModal();
  return (
    <CategoryModal
      type="add"
      title="Add New Category"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitButton={submitButton}
      onSubmit={onAdd}
    />
  );
}
