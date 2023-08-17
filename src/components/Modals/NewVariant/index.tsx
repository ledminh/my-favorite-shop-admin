"use client";

import { Props } from "./types";
import useNewVariantModal from "./hooks";
import VariantModal from "../Variant";

export default function NewVariantModal(props: Props) {
  const { isOpen, setIsOpen, afterAdd } = props;
  const { submitButton, onAdd } = useNewVariantModal();

  return (
    <VariantModal
      type="add"
      title="Add New Category"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitButton={submitButton}
      onSubmit={onAdd}
      afterSubmit={afterAdd}
    />
  );
}
