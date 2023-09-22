import { Variant as VariantType, WithID } from "@/types";
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

  const [variants, setVariants] = useState(initVariants);

  useEffect(() => {
    setVariants(initVariants);
  }, [initVariants]);

  /******************
   * PUBLIC
   */
  const addNew = () => {
    openNewVariantModal();
  };

  const edit = (variant: WithID<VariantType> | WithID<VariantData>) => {
    opentEditVariantModal(variant);
  };

  const remove = (variant: WithID<VariantType> | WithID<VariantData>) => {
    openRemoveVariantModal(variant);
  };

  return {
    variants,
    addNew,
    edit,
    remove,
  };
}
