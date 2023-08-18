import { Variant as VariantType } from "@/types";
import { useState } from "react";
import { Props } from "./types";

export default function useVariantsModal(props: Props) {
  const { initVariants, openNewVariantModal } = props;
  /******************
   * PRIVATE
   */

  const [variants, setVariants] = useState<VariantType[]>(initVariants);

  /******************
   * PUBLIC
   */
  const addNew = () => {
    openNewVariantModal();
  };

  const edit = (variant: VariantType) => {
    console.log("edit", variant);
  };

  return {
    variants,
    addNew,
    edit,
  };
}
