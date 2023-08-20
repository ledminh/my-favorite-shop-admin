import { Promotion as PromotionType } from "@/types";

export type Props = {
  disabled?: boolean;
  onChange: (promotion: PromotionType | null) => void;
  initPromotion?: PromotionType | null;
};

export type _PromotionType = {
  id: "discount" | "sale";
  title: string;
  unit: {
    text: "$" | "%";
    position: "left" | "right";
  };
};
