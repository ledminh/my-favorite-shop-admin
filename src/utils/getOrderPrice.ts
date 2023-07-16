import { Order, OrderedProduct } from "@/types";

export default function getOrderPrice(order: Order) {
  return order.orderedProducts.map(getPrice).reduce((a, b) => a + b, 0);
}

function getPrice(orderedProduct: OrderedProduct): number {
  if (orderedProduct.selectedVariant) {
    return orderedProduct.selectedVariant.price * orderedProduct.quantity;
  }
  return orderedProduct.price * orderedProduct.quantity;
}
