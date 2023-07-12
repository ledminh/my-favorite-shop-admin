import { CustomerMessage, WithID } from "@/types";
import Card from "./Card";

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

/******************************
 * Components
 */
type MessageTabProps = {
  item: CustomerMessage;
};

const MessageTab = ({ item }: MessageTabProps) => {
  const { firstName, lastName, createdAt, message, email } = item;

  return (
    <button className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900">
      <div className="flex justify-between text-sm">
        <h3 className="font-bold">
          {firstName} {lastName}
        </h3>
        <span className="italic font-semibold">
          {createdAt.toLocaleDateString()}
        </span>
      </div>
      <div className="text-xs text-left">{message.slice(0, 100)} ...</div>
    </button>
  );
};
