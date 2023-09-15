"use client";

import Modal from "@/components/layout/Modal";
import { CustomerMessage, WithID } from "@/types";

import { useState } from "react";
import updateMessage from "@/api-calls/updateMessage";
import deleteMessage from "@/api-calls/deleteMessage";

type MessageModalProps = {
  initItem: WithID<CustomerMessage>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterDelete: (item: WithID<CustomerMessage>) => void;
  afterUpdate: (item: WithID<CustomerMessage>) => void;
};

const MessageModal = ({
  initItem,
  isOpen,
  setIsOpen,
  afterDelete,
  afterUpdate,
}: MessageModalProps) => {
  const [item, setItem] = useState(initItem);

  const additionalButtons = [
    {
      text: "DELETE",
      className: "text-red-600 bg-white hover:bg-red-100",
      onClick: () => {
        deleteMessage(item.id).then(() => {
          afterDelete(item);
        });
      },
    },
    {
      text: item.status === "read" ? "MARK AS UNREAD" : "MARK AS READ",
      className:
        "text-stone-800 bg-white hover:bg-neutral-300 active:bg-neutral-400",
      onClick: () => {
        updateMessage(
          item.id,
          item.status === "unread" ? "read" : "unread"
        ).then((updatedMessage) => {
          afterUpdate(updatedMessage);
          setItem(updatedMessage);
        });
      },
    },
  ];

  return (
    <Modal
      title="CUSTOMER MESSAGE"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      additionalButtons={additionalButtons}
    >
      <div className="flex justify-between border-b-2 border-blue-950">
        <span className="text-lg font-semibold">
          {item.firstName} {item.lastName}
        </span>
        <span className="italic">{item.createdAt.toDateString()}</span>
      </div>
      <div className="mt-2 mb-4">
        <InfoTab label="Email" value={item.email} />
        {item.phone && <InfoTab label="Phone" value={item.phone} />}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Message</span>
        <span className="p-4 text-sm border-2 rounded-md border-neutral-700 max-h-[50vh] overflow-y-scroll">
          {item.message}
        </span>
      </div>
    </Modal>
  );
};

export default MessageModal;

/***************************
 * Components
 */
const InfoTab = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-start gap-8">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
};
