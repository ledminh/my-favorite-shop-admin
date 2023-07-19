"use client";

import { CustomerMessage, WithID } from "@/types";

type MessageTabProps = {
  item: WithID<CustomerMessage>;
  setIsModalOpen: (isOpen: boolean) => void;
  setCurrentItem: (item: WithID<CustomerMessage>) => void;
};

const MessageTab = ({
  item,
  setIsModalOpen,
  setCurrentItem,
}: MessageTabProps) => {
  const { firstName, lastName, email, phone, status, message } = item;

  const _message = message.length > 50 ? message.slice(0, 50) + "..." : message;

  const Status =
    status === "read" ? null : (
      <span className="px-2 text-sm text-white bg-red-800">{status}</span>
    );

  const onClick = () => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  return (
    <button
      className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900 active:bg-orange-200"
      onClick={onClick}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900">
            {firstName} {lastName}
          </span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">{phone}</span>
        </div>
        {Status}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-sm font-semibold">Message</span>
        <span className="text-sm text-left">{_message}</span>
      </div>
    </button>
  );
};

export default MessageTab;
