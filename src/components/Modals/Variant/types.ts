import {
  Image as ImageType,
  Variant as VariantType,
  Promotion as PromotionType,
  WithID,
} from "@/types";

export type OnSubmitProps = {
  name: string;
  price: number;
  image: File | ImageType;
  promotion?: PromotionType;
};

export type Props = {
  type: "add" | "edit" | "delete";
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submitButton: {
    text: string;
    className: string;
    disabledClassName: string;
  };
  onSubmit: (props: OnSubmitProps) => Promise<{ data: WithID<VariantType> }>;
  afterSubmit: (variant: WithID<VariantType>) => void;
  initShown?: boolean;
  initName?: string;
  initPriceStr?: string;
  initPromotion?: PromotionType;
  initImage?: File | ImageType | null;
};
