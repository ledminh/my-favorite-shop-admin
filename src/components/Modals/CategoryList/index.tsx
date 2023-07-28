"use client";

import { WithID, Category as CategoryType } from "@/types";
import Modal from "@/components/layout/Modal";

import useCategoryListModal from "./hooks";

type Props = {
  categories: WithID<CategoryType>[];
  onChange: (catID: string | null) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoryListModal({ isOpen, setIsOpen }: Props) {
  const {} = useCategoryListModal();

  const onClose = () => {};
  const additionalButtons = undefined;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Categories"
      onClose={onClose}
      additionalButtons={additionalButtons}
    >
      Category List
    </Modal>
  );
}
