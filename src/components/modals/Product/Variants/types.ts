import { Variant, WithID } from "@/types";
import { OnSubmitProps as VariantData } from "../../Variant/types";

export type Props = {
  initVariants: (WithID<Variant> | WithID<VariantData>)[];
  openNewVariantModal: () => void;
  opentEditVariantModal: (
    variant: WithID<Variant> | WithID<VariantData>
  ) => void;
  openRemoveVariantModal: (
    variant: WithID<Variant> | WithID<VariantData>
  ) => void;
  disabled?: boolean;
};
