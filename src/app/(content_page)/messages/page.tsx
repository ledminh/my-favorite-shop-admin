import { getCustomerMessages } from "@/data/customerMessages";

import MessageList from "@/components/messages/MessageList";
import { itemsPerPage } from "@/config";

export default async function MessagesPage() {
  const { items, total } = await getCustomerMessages({
    offset: 0,
    limit: itemsPerPage,
    sortedBy: "createdAt",
    sortedOrder: "asc",
  });

  return (
    <>
      <MessageList initMessages={items} total={total} />
    </>
  );
}
