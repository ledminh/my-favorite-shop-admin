import { Variant } from "@/types";
import { OnSubmitProps as VariantData } from "../../Variant/types";

export type Props = {
  initVariants: (Variant | VariantData)[];
  openNewVariantModal: () => void;
  opentEditVariantModal: (variant: Variant | VariantData) => void;
  openRemoveVariantModal: (variant: Variant | VariantData) => void;
  disabled?: boolean;
};
