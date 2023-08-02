"use client";

import { WithID, Order, OrderStatus } from "@/types";
import OrderMessList from "@/components/layout/OrderMessList";

import OrderTab from "@/components/OrderTab";
import getTotalPrice from "@/utils/getTotalPrice";
import OrderModal from "@/components/modals/Order";
import { useState, useEffect } from "react";
import { getOrders } from "@/data/orders";
import { itemsPerPage } from "@/config";

type OrderListProps = {
  initOrders: WithID<Order>[];
  total: number;
  sortBy: "customer" | "price" | "createdAt" | "modifiedAt";
  sortedOrder: "asc" | "desc";
  searchTerm: string;
  filter: OrderStatus | null;
};
export default function OrderList({
  initOrders,
  total,
  sortBy,
  sortedOrder,
  searchTerm,
  filter,
}: OrderListProps) {
  const [_initOrders, setInitOrders] = useState(initOrders);

  useEffect(() => {
    (async () => {
      const { items } = await getOrders({
        offset: 0,
        limit: itemsPerPage,
        sortBy,
        sortedOrder,
        searchTerm,
        filter,
      });

      setInitOrders(items);
    })();
  }, [sortBy, sortedOrder, searchTerm, filter]);

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
