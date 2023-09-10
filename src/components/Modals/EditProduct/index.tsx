import useEditProductModal from "./hooks";

import { Product as ProductType, WithID } from "@/types";

import ProductModal from "../Product";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item: WithID<ProductType>;
  afterEdit: (item: WithID<ProductType>) => void;
};
export default function EditProductModal({
  isOpen,
  setIsOpen,
  item,
  afterEdit,
}: Props) {
  const { submitButton, onEdit } = useEditProductModal();
  const { id, name, price, intro, description, promotion, variants, images } =
    item;

  return (
    <ProductModal
      type="edit"
      catName={item.category.name}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Edit Product"
      submitButton={submitButton}
      onSubmit={onEdit}
      afterSubmit={afterEdit}
      initCategoryID={item.category.id}
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
}
