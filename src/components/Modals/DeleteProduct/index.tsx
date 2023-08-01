import { Product as ProductType, WithID } from "@/types";
import useDeleteProductModal from "./hooks";

import ProductModal from "../Product";

type Props = {
  item: WithID<ProductType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DeleteProductModal = ({ item, isOpen, setIsOpen }: Props) => {
  const { submitButton, onSubmit } = useDeleteProductModal();

  return (
    <ProductModal
      type="delete"
      catName={item.category.name}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="DELETE PRODUCT"
      submitButton={submitButton}
      onSubmit={onSubmit}
    />
  );
};

export default DeleteProductModal;
