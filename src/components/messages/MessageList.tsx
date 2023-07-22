"use client";

import { WithID, CustomerMessage } from "@/types";
import OrderMessList from "@/components/layout/OrderMessList";
import MessageTab from "@/components/MessageTab";
import MessageModal from "@/components/modals/Message";

type Props = {
  initMessages: WithID<CustomerMessage>[];
  total: number;
};

export default function MessageList({ initMessages, total }: Props) {
  return (
    <OrderMessList
      initItems={initMessages}
      total={total}
      ItemTab={MessageTab}
      ItemModal={MessageModal}
    />
  );
}
