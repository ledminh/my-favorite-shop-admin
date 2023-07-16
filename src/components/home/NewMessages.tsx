import { CustomerMessage, WithID } from "@/types";
import Card from "./Card";
import MessageTab from "@/components/MessageTab";

type Props = {
  customerMessages: WithID<CustomerMessage>[];
};

export default function NewMessages({ customerMessages }: Props) {
  return (
    <Card
      items={customerMessages}
      ItemTab={MessageTab}
      title="NEW MESSAGES"
      button={{ link: "/messages", text: "SEE ALL MESSAGES" }}
    />
  );
}
