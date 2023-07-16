"use client";

import { useState } from "react";
import { CustomerMessage } from "@/types";
import ModalLg from "@/components/layout/ModalLg";

type MessageTabProps = {
  item: CustomerMessage;
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
  item: CustomerMessage;
  onClick: () => void;
};

const Button = ({ item, onClick }: ButtonProps) => {
  const { firstName, lastName, email, phone, status } = item;

  return (
    <button
      className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900 active:bg-orange-200"
      onClick={onClick}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
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
        <span className="text-sm text-gray-500">{status}</span>
      </div>
    </button>
  );
};

/*******************************************/

type MessageModalProps = {
  item: CustomerMessage;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MessageModal = ({ item, isOpen, setIsOpen }: MessageModalProps) => {
  const { firstName, lastName, email, phone, message, createdAt } = item;

  const additionalButtons = [
    {
      text: "DELETE",
      className: "text-red-600 bg-white hover:bg-red-100",
      onClick: () => console.log("Delete"),
    },
    {
      text: "MARK AS READ",
      className:
        "text-stone-800 bg-white hover:bg-neutral-300 active:bg-neutral-400",
      onClick: () => {
        console.log("Reply");
      },
    },
  ];

  return (
    <ModalLg
      title="CUSTOMER MESSAGE"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      additionalButtons={additionalButtons}
    >
      <div className="flex justify-between border-b-2 border-blue-950">
        <span className="text-lg font-semibold">
          {firstName} {lastName}
        </span>
        <span className="italic">{createdAt.toDateString()}</span>
      </div>
      <div className="mt-2 mb-4">
        <InfoTab label="Email" value={email} />
        {phone && <InfoTab label="Phone" value={phone} />}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Message</span>
        <span className="p-4 text-sm border rounded-md border-neutral-700">
          {message}
        </span>
      </div>
    </ModalLg>
  );
};

const InfoTab = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-start gap-8">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
};
