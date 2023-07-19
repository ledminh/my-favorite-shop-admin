"use client";

import { useState } from "react";
import { CustomerMessage, WithID } from "@/types";
import MessageModal from "@/components/Modals/Message";

type MessageTabProps = {
  item: WithID<CustomerMessage>;
};

const MessageTab = ({ item }: MessageTabProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button item={item} onClick={() => setIsOpen(true)} />
      <MessageModal isOpen={isOpen} setIsOpen={setIsOpen} item={item} />
    </>
  );
};

export default MessageTab;

/*************************
 * Components
 */

type ButtonProps = {
  item: WithID<CustomerMessage>;
  onClick: () => void;
};

const Button = ({ item, onClick }: ButtonProps) => {
  const { firstName, lastName, email, phone, status, message } = item;

  const _message = message.length > 50 ? message.slice(0, 50) + "..." : message;

  const Status =
    status === "read" ? null : (
      <span className="px-2 text-sm text-white bg-red-800">{status}</span>
    );
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
