import { OnSubmitProps } from "../Variant/types";

export type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterAdd: (item: OnSubmitProps) => void;
};
