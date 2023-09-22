"use client";

import { Props } from "./types";
import useRemoveVariantModal from "./hooks";
import VariantModal from "../Variant";

export default function RemoveVariantModal(props: Props) {
  const { submitButton, onRemove } = useRemoveVariantModal();

  const { isOpen, setIsOpen, afterRemove, variant } = props;
  const { id, shown, name, promotion, price, image } = variant;

  return (
    <VariantModal
      type="delete"
      title="Remove Variant"
      id={id}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitButton={submitButton}
      onSubmit={onRemove}
      afterSubmit={afterRemove}
      initShown={shown}
      initName={name}
      initPriceStr={price.toString()}
      initPromotion={promotion}
      initImage={image}
    />
  );
}
