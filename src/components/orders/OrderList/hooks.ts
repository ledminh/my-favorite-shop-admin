import { useState, useEffect } from "react";
import { getOrders } from "@/data/orders";
import { smallItemsPerPage } from "@/config";

import { Props } from "./types";
import { Order, WithID } from "@/types";

export default function useOrders(props: Props) {
  const { initOrders, sortBy, sortedOrder, searchTerm, filter } = props;

  const [_initOrders, setInitOrders] = useState(initOrders);

  useEffect(() => {
    (async () => {
      const { items } = await getOrders({
        offset: 0,
        limit: smallItemsPerPage,
        sortBy,
        sortedOrder,
        searchTerm,
        filter,
      });

      setInitOrders(items);
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
    const { items } = await getOrders({
      offset,
      limit,
      sortBy,
      sortedOrder,
      searchTerm,
      filter,
    });

    return items;
  };

  const afterDelete = (order: WithID<Order>) => {
    setInitOrders((prev) => prev.filter((item) => item.id !== order.id));
  };

  const afterUpdate = (order: WithID<Order>) => {
    setInitOrders((prev) => {
      const index = prev.findIndex((item) => item.id === order.id);

      if (index === -1) return prev;

      return [...prev.slice(0, index), order, ...prev.slice(index + 1)];
    });
  };

  return {
    _initOrders,
    onLoadMore,
    afterDelete,
    afterUpdate,
  };
}
