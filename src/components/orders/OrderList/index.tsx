"use client";

import OrderMessList from "@/components/layout/OrderMessList";

import OrderTab from "@/components/OrderTab";
import getTotalPrice from "@/utils/getTotalPrice";
import OrderModal from "@/components/modals/Order";

import { Props } from "./types";
import useOrders from "./hooks";

export default function OrderList(props: Props) {
  const { _initOrders, onLoadMore, afterDelete, afterUpdate, total } =
    useOrders(props);

  return (
    <OrderMessList
      initItems={_initOrders}
      total={total}
      onLoadMore={onLoadMore}
      afterDelete={afterDelete}
      afterUpdate={afterUpdate}
      ItemTab={OrderTab}
      ItemModal={OrderModal}
      getTotalPrice={getTotalPrice}
    />
  );
}
