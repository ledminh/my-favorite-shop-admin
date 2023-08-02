"use client";

import { useState } from "react";

import { CustomerMessage, WithID } from "@/types";
import Card from "./Card";
import MessageTab from "@/components/MessageTab";
import MessageModal from "@/components/modals/Message";

import { getCustomerMessages } from "@/data/customerMessages";

type Props = {
  initMessages: WithID<CustomerMessage>[];
};

export default function NewMessages({ initMessages }: Props) {
  const [customerMessages, setCustomerMessages] = useState(initMessages);

  const afterDelete = () => {
    getCustomerMessages({
      offset: 0,
      limit: 7,
      filter: "unread",
      sortedBy: "createdAt",
      sortedOrder: "desc",
    }).then(({ items: updatedMessages }) => {
      setCustomerMessages(updatedMessages);
    });
  };

  const afterUpdate = () => {
    getCustomerMessages({
      offset: 0,
      limit: 7,
      filter: "unread",
      sortedBy: "createdAt",
      sortedOrder: "desc",
    }).then(({ items: updatedMessages }) => {
      setCustomerMessages(updatedMessages);
    });
  };

  return (
    <Card
      items={customerMessages}
      ItemTab={MessageTab}
      ItemModal={MessageModal}
      title="NEW MESSAGES"
      button={{ link: "/messages", text: "SEE ALL MESSAGES" }}
      afterDelete={afterDelete}
      afterUpdate={afterUpdate}
    />
  );
}
