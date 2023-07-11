import { getCustomerMessages } from "@/data/customerMessages";

import MessageList from "@/components/messages/MessageList";

export default async function MessagesPage() {
  const { items, total } = await getCustomerMessages();

  return (
    <>
      <MessageList initMessages={items} total={total} />
    </>
  );
}
