"use client";

import { useState } from "react";
import { CustomerMessage } from "@/types";
import { Dialog } from "@headlessui/react";

type MessageTabProps = {
  item: CustomerMessage;
};

const MessageTab = ({ item }: MessageTabProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button item={item} onClick={() => setIsOpen(true)} />
      <MessageModal isOpen={isOpen} setIsOpen={setIsOpen} />
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

type MessageModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MessageModal = ({ isOpen, setIsOpen }: MessageModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="max-w-sm mx-auto bg-white rounded">
          <Dialog.Title>Complete your order</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          {/*
          You can render additional buttons to dismiss your dialog by setting
          `isOpen` to `false`.
        */}
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => {}}>Deactivate</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
