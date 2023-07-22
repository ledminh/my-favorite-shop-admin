"use client";

import { WithID, Order } from "@/types";
import OrderMessList from "@/components/layout/OrderMessList";

import OrderTab from "@/components/OrderTab";
import getTotalPrice from "@/utils/getTotalPrice";
import OrderModal from "@/components/modals/Order";

type OrderListProps = {
  initOrders: WithID<Order>[];
  total: number;
};
export default function OrderList({ initOrders, total }: OrderListProps) {
  return (
    <OrderMessList
      initItems={initOrders}
      total={total}
      ItemTab={OrderTab}
      ItemModal={OrderModal}
      getTotalPrice={getTotalPrice}
    />
  );
}
