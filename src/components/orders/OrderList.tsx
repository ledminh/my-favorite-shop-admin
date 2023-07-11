"use client";

import { WithID, Order } from "@/types";
import OrderMessList from "@/components/layout/OrderMessList";

type OrderListProps = {
  initOrders: WithID<Order>[];
  total: number;
};
export default function OrderList({ initOrders, total }: OrderListProps) {
  return (
    <OrderMessList initItems={initOrders} total={total} ItemTab={OrderTab} />
  );
}

/********************
 * Components
 */

const OrderTab = ({ item }: { item: Order }) => {
  return <div>{item.shippingAddress.firstName}</div>;
};
