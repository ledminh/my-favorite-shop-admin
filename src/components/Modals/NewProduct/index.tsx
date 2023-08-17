import useNewProductModal from "./hooks";

import { Category, WithID, Product } from "@/types";
import ProductModal from "../Product";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: WithID<Category>[];
  afterAdd: (item: WithID<Product>) => void;
};
export default function NewProductModal({
  isOpen,
  setIsOpen,
  categories,
  afterAdd,
}: Props) {
  const { submitButton, onAdd } = useNewProductModal();

  return (
    <ProductModal
      type="add"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add New Product"
      categories={categories}
      submitButton={submitButton}
      onSubmit={onAdd}
      afterSubmit={afterAdd}
    />
  );
}
