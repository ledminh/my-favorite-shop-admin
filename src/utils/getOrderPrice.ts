import { Order, OrderedProduct } from "@/types";

export default function getOrderPrice(order: Order) {
  return order.orderedProducts.map(getPrice).reduce((a, b) => a + b, 0);
}

function getPrice(orderedProduct: OrderedProduct): number {
  const { selectedVariant, quantity } = orderedProduct;

  let price = orderedProduct.price;

  if (selectedVariant) {
    price = selectedVariant.price;

    if (selectedVariant.promotion) {
      price =
        selectedVariant.promotion.type === "discount"
          ? price * (1 - selectedVariant.promotion.discountPercent / 100)
          : selectedVariant.promotion.salePrice;
    }
  }
  return price * quantity;
}
