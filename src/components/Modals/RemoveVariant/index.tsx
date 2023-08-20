"use client";

import { Props } from "./types";
import useEditVariantModal from "./hooks";
import VariantModal from "../Variant";

export default function EditDeleteVariantModal(props: Props) {
  const { submitButton, onEdit } = useEditVariantModal();

  const { isOpen, setIsOpen, afterEdit, variant } = props;
  const { shown, name, promotion, price, image } = variant;

  console.log(promotion);

  return (
    <VariantModal
      type="edit"
      title="Edit Variant"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitButton={submitButton}
      onSubmit={onEdit}
      afterSubmit={afterEdit}
      initShown={shown}
      initName={name}
      initPriceStr={price.toString()}
      initPromotion={promotion}
      initImage={image}
    />
  );
}
