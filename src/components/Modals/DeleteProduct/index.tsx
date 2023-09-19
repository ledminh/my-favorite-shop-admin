import { Product as ProductType, WithID } from "@/types";
import useDeleteProductModal from "./hooks";

import ProductModal from "../Product";

type Props = {
  item: WithID<ProductType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterDelete: (item: WithID<ProductType>) => void;
  setLoading: (loading: boolean) => void;
};

const DeleteProductModal = ({
  item,
  isOpen,
  setIsOpen,
  afterDelete,
  setLoading,
}: Props) => {
  const { submitButton, onDelete } = useDeleteProductModal();
  const { id, name, price, intro, description, promotion, variants, images } =
    item;

  if (price === undefined) {
    return (
      <ProductModal
        type="delete"
        setLoading={setLoading}
        catName={item.category.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Delete Product"
        submitButton={submitButton}
        onSubmit={onDelete}
        afterSubmit={afterDelete}
        initSerial={id}
        initName={name}
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
      type="delete"
      setLoading={setLoading}
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
      initImages={images}
    />
  );
};

export default DeleteProductModal;
