"use client";

import { WithID, Order, OrderStatus } from "@/types";
import OrderMessList from "@/components/layout/OrderMessList";

import OrderTab from "@/components/OrderTab";
import getTotalPrice from "@/utils/getTotalPrice";
import OrderModal from "@/components/modals/Order";

import { Props } from "./types";
import useOrders from "./hooks";

export default function OrderList(props: Props) {
  const { total } = props;
  const { _initOrders, onLoadMore } = useOrders(props);

  return (
    <OrderMessList
      initItems={_initOrders}
      total={total}
      onLoadMore={onLoadMore}
      ItemTab={OrderTab}
      ItemModal={OrderModal}
      getTotalPrice={getTotalPrice}
    />
  );
}
