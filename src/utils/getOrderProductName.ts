import { OrderedProduct } from "@/types";

export default function getOrderProductName(oProduct: OrderedProduct) {
  const { name, selectedVariant } = oProduct;

  if (selectedVariant) {
    return `${name} - ${selectedVariant.name}`;
  }

  return name;
}
