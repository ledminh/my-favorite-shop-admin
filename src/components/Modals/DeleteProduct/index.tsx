import { Product as ProductType, WithID } from "@/types";
import useDeleteProductModal from "./hooks";

import ProductModal from "../Product";

type Props = {
  item: WithID<ProductType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterDelete: (item: WithID<ProductType>) => void;
};

const DeleteProductModal = ({
  item,
  isOpen,
  setIsOpen,
  afterDelete,
}: Props) => {
  const { submitButton, onDelete } = useDeleteProductModal();
  const { id, name, price, intro, description, promotion, variants, images } =
    item;

  return (
    <ProductModal
      type="delete"
      catName={item.category.name}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Delete Product"
      submitButton={submitButton}
      onSubmit={onDelete}
      afterSubmit={afterDelete}
      initSerial={id}
      initName={name}
      initPriceStr={price.toString()}
      initIntro={intro}
      initDescription={description}
      initPromotion={promotion}
      initVariants={variants}
      initImages={images}
    />
  );
};

export default DeleteProductModal;
