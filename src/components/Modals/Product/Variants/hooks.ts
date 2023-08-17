import { Variant as VariantType } from "@/types";
import { useState } from "react";
import { Props } from "./types";

export default function useVariantsModal(props: Props) {
  const { initVariants, openVariantModal } = props;
  /******************
   * PRIVATE
   */

  const [variants, setVariants] = useState<VariantType[]>(initVariants);

  /******************
   * PUBLIC
   */
  const addNew = () => {
    openVariantModal();
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
