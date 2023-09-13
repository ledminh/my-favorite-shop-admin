"use client";

import { useState } from "react";

import { CustomerMessage, WithID } from "@/types";
import Card from "./Card";
import MessageTab from "@/components/MessageTab";
import MessageModal from "@/components/modals/Message";

import getMessages from "@/api-calls/getMessages";

type Props = {
  initMessages: WithID<CustomerMessage>[];
};

export default function NewMessages({ initMessages }: Props) {
  const [customerMessages, setCustomerMessages] = useState(initMessages);

  const afterDelete = () => {
    getMessages({
      offset: 0,
      limit: 7,
      sortBy: "createdAt",
      order: "desc",
      filter: "unread",
    }).then(({ messages: updatedMessages }) => {
      setCustomerMessages(updatedMessages);
    });
  };

  const afterUpdate = () => {
    getMessages({
      offset: 0,
      limit: 7,
      sortBy: "createdAt",
      order: "desc",
      filter: "unread",
    }).then(({ messages: updatedMessages }) => {
      setCustomerMessages(updatedMessages);
    });
  };

  return (
    <Card
      title="NEW MESSAGES"
      button={{ link: "/messages", text: "SEE ALL MESSAGES" }}
      items={customerMessages}
      ItemTab={MessageTab}
      ItemModal={MessageModal}
      afterDelete={afterDelete}
      afterUpdate={afterUpdate}
    />
  );
}
