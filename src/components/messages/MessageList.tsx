"use client";

import { WithID, CustomerMessage } from "@/types";
import OrderMessList from "../layout/OrderMessList";

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
    />
  );
}

/************************
 * Components
 */

type MessageTabProps = {
  item: WithID<CustomerMessage>;
};

function MessageTab({ item }: MessageTabProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {item.firstName} {item.lastName}
          </span>
          <span className="text-sm text-gray-500">{item.email}</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">{item.phone}</span>
        </div>
        <span className="text-sm text-gray-500">{item.status}</span>
      </div>
    </div>
  );
}
