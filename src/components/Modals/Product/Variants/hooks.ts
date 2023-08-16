import { Variant as VariantType } from "@/types";
import { useState } from "react";
import { Props } from "./types";

export default function useVariantsModal(props: Props) {
  const { initVariants } = props;
  /******************
   * PRIVATE
   */

  const [variants, setVariants] = useState<VariantType[]>(initVariants);

  /******************
   * PUBLIC
   */

  return {
    variants,
  };
}
