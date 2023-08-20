import { Variant as VariantType } from "@/types";
import { OnSubmitProps } from "../Variant/types";

export type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterEdit: (item: OnSubmitProps) => void;
  variant: OnSubmitProps | VariantType;
};
