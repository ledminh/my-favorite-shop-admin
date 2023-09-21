"use client";

import { Props } from "./types";
import useEditVariantModal from "./hooks";
import VariantModal from "../Variant";

export default function EditVariantModal(props: Props) {
  const { submitButton, onEdit } = useEditVariantModal();

  const { isOpen, setIsOpen, afterEdit, variant, disabled } = props;
  const { id, shown, name, promotion, price, image } = variant;

  return (
    <VariantModal
      type="edit"
      title="Edit Variant"
      id={id}
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
      disabled={disabled}
    />
  );
}
