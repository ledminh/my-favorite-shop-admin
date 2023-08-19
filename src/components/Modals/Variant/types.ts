import { Image as ImageType, Promotion as PromotionType } from "@/types";

export type OnSubmitProps = {
  delete?: boolean;
  shown: boolean;
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
  onSubmit: (props: OnSubmitProps) => Promise<{ data: OnSubmitProps }>;
  afterSubmit: (variant: OnSubmitProps) => void;
  initShown?: boolean;
  initName?: string;
  initPriceStr?: string;
  initPromotion?: PromotionType;
  initImage?: File | ImageType | null;
};
