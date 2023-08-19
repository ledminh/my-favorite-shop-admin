import { Variant } from "@/types";
import { OnSubmitProps as VariantData } from "../../Variant/types";

export type Props = {
  initVariants: (Variant | VariantData)[];
  openNewVariantModal: () => void;
  opentEditDeleteVariantModal: (variant: Variant | VariantData) => void;
};
