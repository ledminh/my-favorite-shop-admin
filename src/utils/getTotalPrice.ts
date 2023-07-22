import { Order } from "@/types";

import getOrderPrice from "./getOrderPrice";

export default function getTotalPrice(orders: Order[]) {
  return orders.map(getOrderPrice).reduce((a, b) => a + b, 0);
}
