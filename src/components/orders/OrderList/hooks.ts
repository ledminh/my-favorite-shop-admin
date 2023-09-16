import { useState, useEffect } from "react";
import getOrders from "@/api-calls/getOrders";
import { smallItemsPerPage } from "@/config";

import { Props } from "./types";
import { Order, WithID } from "@/types";

export default function useOrders(props: Props) {
  const { initOrders, sortBy, sortedOrder, searchTerm, filter, total } = props;

  const [_initOrders, setInitOrders] = useState(initOrders);
  const [_total, setTotal] = useState(total);

  useEffect(() => {
    (async () => {
      const { orders, total } = await getOrders({
        offset: 0,
        limit: smallItemsPerPage,
        sortBy,
        order: sortedOrder,
        searchTerm,
        filter,
      });

      setInitOrders(orders);
      setTotal(total);
    })();
  }, [sortBy, sortedOrder, searchTerm, filter]);

  /*************************
   * Public
   */
  const onLoadMore = async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => {
    const { orders, total } = await getOrders({
      offset,
      limit,
      sortBy,
      order: sortedOrder,
      searchTerm,
      filter,
    });

    setTotal(total);

    return orders;
  };

  const afterDelete = (order: WithID<Order>) => {
    setInitOrders((prev) => prev.filter((item) => item.id !== order.id));
    setTotal((prev) => prev - 1);
  };

  const afterUpdate = (order: WithID<Order>) => {
    setInitOrders((prev) => {
      const index = prev.findIndex((item) => item.id === order.id);

      if (index === -1) return prev;

      return [...prev.slice(0, index), order, ...prev.slice(index + 1)];
    });
  };

  return {
    total: _total,
    _initOrders,
    onLoadMore,
    afterDelete,
    afterUpdate,
  };
}
