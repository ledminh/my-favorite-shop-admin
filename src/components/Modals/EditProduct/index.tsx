import useEditProductModal from "./hooks";

import { Product as ProductType, WithID } from "@/types";

import ProductModal from "../Product";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item: WithID<ProductType>;
  afterEdit: (item: WithID<ProductType>) => void;
  setLoading: (loading: boolean) => void;
};

export default function EditProductModal({
  isOpen,
  setIsOpen,
  item,
  afterEdit,
  setLoading,
}: Props) {
  const { submitButton, onEdit } = useEditProductModal();
  const {
    id,
    name,
    price,
    intro,
    description,
    promotion,
    variants,
    images,
    category,
  } = item;

  if (price === undefined) {
    return (
      <ProductModal
        type="edit"
        setLoading={setLoading}
        catName={item.category.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Edit Product"
        submitButton={submitButton}
        onSubmit={onEdit}
        afterSubmit={afterEdit}
        initSerial={id}
        initName={name}
        initCategoryID={category.id}
        initIntro={intro}
        initDescription={description}
        initPromotion={promotion}
        initVariants={variants}
        initImages={images}
      />
    );
  }

  return (
    <ProductModal
      type="edit"
      setLoading={setLoading}
      catName={item.category.name}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Edit Product"
      submitButton={submitButton}
      onSubmit={onEdit}
      afterSubmit={afterEdit}
      initSerial={id}
      initName={name}
      initCategoryID={category.id}
      initPriceStr={price.toString()}
      initIntro={intro}
      initDescription={description}
      initPromotion={promotion}
      initImages={images}
    />
  );
}
