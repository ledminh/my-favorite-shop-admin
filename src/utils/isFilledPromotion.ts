import { Promotion } from "@/types";

export default function isFilledPromotion(promotion: Promotion) {
  if (promotion.type === "discount") {
    return promotion.discountPercent > 0 && promotion.description.length > 0;
  } else if (promotion.type === "sale") {
    return promotion.salePrice > 0 && promotion.description.length > 0;
  }

  return false;
}
