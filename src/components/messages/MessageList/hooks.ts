import { useState, useEffect } from "react";
import { getCustomerMessages } from "@/data/customerMessages";
import { smallItemsPerPage } from "@/config";

import { Props } from "./types";
import { CustomerMessage, WithID } from "@/types";

export default function useMessageList(props: Props) {
  const { initMessages, sortedBy, sortedOrder, searchTerm, filter } = props;

  const [_initMessages, setInitMessages] = useState(initMessages);

  useEffect(() => {
    (async () => {
      const { items } = await getCustomerMessages({
        offset: 0,
        limit: smallItemsPerPage,
        sortedBy,
        sortedOrder,
        searchTerm,
        filter,
      });

      setInitMessages(items);
    })();
  }, [sortedBy, sortedOrder, searchTerm, filter]);

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
    const { items } = await getCustomerMessages({
      offset,
      limit,
      sortedBy,
      sortedOrder,
      searchTerm,
      filter,
    });

    return items;
  };

  const afterDelete = (message: WithID<CustomerMessage>) => {
    setInitMessages((prev) => prev.filter((item) => item.id !== message.id));
  };

  const afterUpdate = (message: WithID<CustomerMessage>) => {
    setInitMessages((prev) => {
      const index = prev.findIndex((item) => item.id === message.id);

      if (index === -1) return prev;

      return [...prev.slice(0, index), message, ...prev.slice(index + 1)];
    });
  };

  return {
    _initMessages,
    onLoadMore,
    afterDelete,
    afterUpdate,
  };
}
