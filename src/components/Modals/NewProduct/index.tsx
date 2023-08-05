import useNewProductModal from "./hooks";

import { Category, WithID } from "@/types";

import ProductModal from "../Product";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: WithID<Category>[];
};
export default function NewProductModal({
  isOpen,
  setIsOpen,
  categories,
}: Props) {
  const { submitButton, onSubmit } = useNewProductModal();

  return (
    <ProductModal
      type="add"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="ADD NEW PRODUCT"
      categories={categories}
      submitButton={submitButton}
      onSubmit={onSubmit}
    />
  );
}
