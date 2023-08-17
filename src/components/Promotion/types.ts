import { Promotion as PromotionType } from "@/types";

export type Props = {
  onChange: (promotion: PromotionType | null) => void;
};

export type _PromotionType = {
  id: "discount" | "sale";
  title: string;
  unit: {
    text: "$" | "%";
    position: "left" | "right";
  };
};
