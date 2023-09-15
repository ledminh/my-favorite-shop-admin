import { useState, useEffect } from "react";
import getCustomerMessages from "@/api-calls/getMessages";

import { smallItemsPerPage } from "@/config";

import { Props } from "./types";
import { CustomerMessage, WithID } from "@/types";

export default function useMessageList(props: Props) {
  const { initMessages, sortedBy, sortedOrder, searchTerm, filter, total } =
    props;

  const [_initMessages, setInitMessages] = useState(initMessages);
  const [_total, setTotal] = useState(total);

  useEffect(() => {
    (async () => {
      const { messages, total } = await getCustomerMessages({
        offset: 0,
        limit: smallItemsPerPage,
        sortBy: sortedBy,
        order: sortedOrder,
        searchTerm,
        filter,
      });

      setTotal(total);
      setInitMessages(messages);
    })();
  }, [sortedBy, sortedOrder, searchTerm, filter]);

  /*************************
   * Public
   */
  const onLoadMore = async ({ offset }: { offset: number }) => {
    const { messages, total } = await getCustomerMessages({
      offset,
      limit: smallItemsPerPage,
      sortBy: sortedBy,
      order: sortedOrder,
      searchTerm,
      filter,
    });

    setTotal(total);

    return messages;
  };

  const afterDelete = (message: WithID<CustomerMessage>) => {
    setInitMessages((prev) => prev.filter((item) => item.id !== message.id));
    setTotal((prev) => prev - 1);
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
