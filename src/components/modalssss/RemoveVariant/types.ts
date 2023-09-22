import { Variant as VariantType, WithID } from "@/types";
import { OnSubmitProps } from "../Variant/types";

export type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterRemove: (item: WithID<OnSubmitProps>) => void;
  variant: WithID<OnSubmitProps> | WithID<VariantType>;
};
