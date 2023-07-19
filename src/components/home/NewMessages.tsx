import { CustomerMessage, WithID } from "@/types";
import Card from "./Card";
import MessageTab from "@/components/MessageTab";
import MessageModal from "@/components/modals/Message";

type Props = {
  customerMessages: WithID<CustomerMessage>[];
};

export default function NewMessages({ customerMessages }: Props) {
  return (
    <Card
      items={customerMessages}
      ItemTab={MessageTab}
      ItemModal={MessageModal}
      title="NEW MESSAGES"
      button={{ link: "/messages", text: "SEE ALL MESSAGES" }}
    />
  );
}
