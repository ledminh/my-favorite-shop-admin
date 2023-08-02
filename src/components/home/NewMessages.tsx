"use client";

import { useState } from "react";

import { CustomerMessage, WithID } from "@/types";
import Card from "./Card";
import MessageTab from "@/components/MessageTab";
import MessageModal from "@/components/modals/Message";

type Props = {
  initMessages: WithID<CustomerMessage>[];
};

export default function NewMessages({ initMessages }: Props) {
  const [customerMessages, setCustomerMessages] = useState(initMessages);

  const afterDelete = (message: WithID<CustomerMessage>) => {
    setCustomerMessages((prev) =>
      prev.filter((prevMessage) => prevMessage.id !== message.id)
    );
  };

  const afterUpdate = (message: WithID<CustomerMessage>) => {
    setCustomerMessages((prev) =>
      prev.map((prevMessage) =>
        prevMessage.id === message.id ? message : prevMessage
      )
    );
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
