"use client";

import { useState } from "react";
import { CustomerMessage, WithID } from "@/types";
import ModalLg from "@/components/layout/ModalLg";

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

/*******************************************/

type MessageModalProps = {
  item: WithID<CustomerMessage>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MessageModal = ({ item, isOpen, setIsOpen }: MessageModalProps) => {
  const { firstName, lastName, email, phone, message, createdAt, status } =
    item;

  const additionalButtons = [
    {
      text: "DELETE",
      className: "text-red-600 bg-white hover:bg-red-100",
      onClick: () => {
        deleteMessage(item.id, (res) => {
          console.log(res);
        });
      },
    },
    {
      text: status === "read" ? "MARK AS UNREAD" : "MARK AS READ",
      className:
        "text-stone-800 bg-white hover:bg-neutral-300 active:bg-neutral-400",
      onClick: () => {
        updateMessage(
          item.id,
          {
            status: status === "read" ? "unread" : "read",
          },
          (res) => {
            console.log(res);
          }
        );
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
        <span className="p-4 text-sm border-2 rounded-md border-neutral-700 max-h-[50vh] overflow-y-scroll">
          {message}
          {message}
          {message}
          {message}
          {message}
          {message}
          {message}
          {message}
          {message}
          {message}
          {message}
          {message}
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

/***************************
 * Utils
 */

const deleteMessage = (id: string, cb: (res: any) => void) => {
  return fetch(`/api/messages/${id}`, {
    method: "DELETE",
  }).then((res) => cb(res));
};

const updateMessage = (
  id: string,
  data: { status: string },
  cb: (res: any) => void
) => {
  return fetch(`/api/messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => cb(res));
};
