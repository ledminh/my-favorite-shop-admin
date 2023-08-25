import { useState, useEffect } from "react";
import { getOrders } from "@/data/orders";
import { itemsPerPage } from "@/config";

import { Props } from "./types";

export default function useOrders(props: Props) {
  const { initOrders, sortBy, sortedOrder, searchTerm, filter } = props;

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

  return {
    _initOrders,
    onLoadMore,
  };
}
