"use client";

import { WithID, CustomerMessage, CustomerMessageStatus } from "@/types";
import OrderMessList from "@/components/layout/OrderMessList";
import MessageTab from "@/components/MessageTab";
import MessageModal from "@/components/modals/Message";

type Props = {
  initMessages: WithID<CustomerMessage>[];
  total: number;
  sortBy: "customer" | "email" | "createdAt";
  sortedOrder: "asc" | "desc";
  searchTerm: string;
  filter: CustomerMessageStatus | null;
};

export default function MessageList({
  initMessages,
  total,
  sortBy,
  sortedOrder,
  searchTerm,
  filter,
}: Props) {
  return (
    <OrderMessList
      initItems={initMessages}
      total={total}
      ItemTab={MessageTab}
      ItemModal={MessageModal}
    />
  );
}
