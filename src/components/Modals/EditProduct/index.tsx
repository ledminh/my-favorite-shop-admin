import useEditProductModal from "./hooks";

import { Product as ProductType, WithID } from "@/types";

import ProductModal from "../Product";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item: WithID<ProductType>;
};
export default function EditProductModal({ isOpen, setIsOpen, item }: Props) {
  const { submitButton, onSubmit } = useEditProductModal();

  return (
    <ProductModal
      type="edit"
      catName={item.category.name}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="EDIT PRODUCT"
      submitButton={submitButton}
      onSubmit={onSubmit}
    />
  );
}
