import { Variant as VariantType } from "@/types";
import { OnSubmitProps } from "../Variant/types";

export type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterRemove: (item: OnSubmitProps) => void;
  variant: OnSubmitProps | VariantType;
};
