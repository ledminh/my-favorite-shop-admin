"use client";

import { useState } from "react";
import { CustomerMessage } from "@/types";
import { Dialog } from "@headlessui/react";

type MessageTabProps = {
  item: CustomerMessage;
};

const MessageTab = ({ item }: MessageTabProps) => {
  const [isOpen, setIsOpen] = useState(true);

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
  const { firstName, lastName, createdAt, message } = item;

  return (
    <button
      className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900 active:bg-orange-200"
      onClick={onClick}
    >
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

/*******************************************/

type MessageModalProps = {
  item: CustomerMessage;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MessageModal = ({ item, isOpen, setIsOpen }: MessageModalProps) => {
  const { firstName, lastName, email, phone, message, status, createdAt } =
    item;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="max-w-4xl mx-auto overflow-hidden bg-white rounded">
          <Dialog.Title className="p-2 bg-blue-950">
            <h2 className="text-xl font-semibold text-white ">
              Customer Message
            </h2>
          </Dialog.Title>
          <div className="p-4">
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
          </div>
          <div className="flex gap-6 p-2 bg-blue-950/80 flex-start">
            <ModalButton
              text="CLOSE"
              className="text-white bg-blue-950 hover:bg-blue-900 active:bg-blue-700"
              onClick={() => setIsOpen(false)}
            />
            <ModalButton
              text="MARK AS READ"
              className="bg-white text-blue-950 hover:bg-neutral-300"
              onClick={() => setIsOpen(false)}
            />
            <ModalButton
              text="DELETE"
              className="text-red-600 bg-white hover:bg-red-100"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
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

const ModalButton = ({
  text,
  className,
  onClick,
}: {
  text: string;
  className: string;
  onClick: () => void;
}) => (
  <button
    className={`px-4 py-2 text-sm font-semibold rounded-md ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
);
