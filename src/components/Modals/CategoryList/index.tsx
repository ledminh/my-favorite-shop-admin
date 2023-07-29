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

export default function CategoryListModal({
  isOpen,
  setIsOpen,
  categories,
  onChange,
}: Props) {
  const {} = useCategoryListModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Categories" size="sm">
      <ul className="flex flex-col gap-2 max-h-[60vh] overflow-y-scroll p-6">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className="w-full px-4 py-2 text-sm font-semibold text-white rounded-md bg-blue-950/60 hover:bg-blue-950 active:bg-blue-900"
              onClick={() => {
                onChange(cat.id);
                setIsOpen(false);
              }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
