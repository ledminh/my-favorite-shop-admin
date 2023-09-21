import {
  Image as ImageType,
  Promotion as PromotionType,
  WithID,
} from "@/types";

export type OnSubmitProps = {
  shown: boolean;
  name: string;
  price: number;
  image: File | ImageType;
  promotion?: PromotionType;
};

export type Props = (
  | {
      type: "add";
      id?: undefined;
    }
  | {
      type: "edit" | "delete";
      id: string;
    }
) & {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submitButton: {
    text: string;
    className: string;
    disabledClassName: string;
  };
  onSubmit: (
    props: WithID<OnSubmitProps>
  ) => Promise<{ data: WithID<OnSubmitProps> }>;
  afterSubmit: (variant: WithID<OnSubmitProps>) => void;
  initShown?: boolean;
  initName?: string;
  initPriceStr?: string;
  initPromotion?: PromotionType;
  initImage?: File | ImageType | null;

  disabled?: boolean;
};
