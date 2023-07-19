import { getCustomerMessages } from "@/data/customerMessages";

import MessageList from "@/components/messages/MessageList";
import { itemsPerPage } from "@/config";
import ControlPanel from "@/components/messages/ControlPanel";

export default async function MessagesPage() {
  const { items, total } = await getCustomerMessages({
    offset: 0,
    limit: itemsPerPage,
    sortedBy: "createdAt",
    sortedOrder: "asc",
  });

  return (
    <div className="m-4">
      <ControlPanel />
      <MessageList initMessages={items} total={total} />
    </div>
  );
}
