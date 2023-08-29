import { Variant as VariantType } from "@/types";
import { OnSubmitProps as VariantData } from "../../Variant/types";
import { useState, useEffect } from "react";
import { Props } from "./types";

export default function useVariantsModal(props: Props) {
  const {
    initVariants,
    openNewVariantModal,
    opentEditVariantModal,
    openRemoveVariantModal,
  } = props;

  /******************
   * PRIVATE
   */

  const [variants, setVariants] =
    useState<(VariantType | VariantData)[]>(initVariants);

  useEffect(() => {
    setVariants(initVariants);
  }, [initVariants]);

  /******************
   * PUBLIC
   */
  const addNew = () => {
    openNewVariantModal();
  };

  const edit = (variant: VariantType | VariantData) => {
    opentEditVariantModal(variant);
  };

  const remove = (variant: VariantType | VariantData) => {
    openRemoveVariantModal(variant);
  };

  return {
    variants,
    addNew,
    edit,
    remove,
  };
}
