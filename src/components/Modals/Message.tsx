"use client";

import Modal from "@/components/layout/Modal";
import {
  CustomerMessage,
  DeleteMessageResponse,
  UpdateMessageResponse,
  WithID,
} from "@/types";

type MessageModalProps = {
  item: WithID<CustomerMessage>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterDelete: (item: WithID<CustomerMessage>) => void;
  afterUpdate: (item: WithID<CustomerMessage>) => void;
};

const MessageModal = ({
  item,
  isOpen,
  setIsOpen,
  afterDelete,
  afterUpdate,
}: MessageModalProps) => {
  const { firstName, lastName, email, phone, message, createdAt, status } =
    item;

  const additionalButtons = [
    {
      text: "DELETE",
      className: "text-red-600 bg-white hover:bg-red-100",
      onClick: () => {
        deleteMessage(item.id, (res) => {
          if (res.errorMessage) {
            throw new Error(res.errorMessage);
          }

          afterDelete(res.data as WithID<CustomerMessage>);
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
            if (res.errorMessage) {
              throw new Error(res.errorMessage);
            }

            afterUpdate(res.data as WithID<CustomerMessage>);
          }
        );
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

/***************************
 * Utils
 */

const deleteMessage = (
  id: string,
  cb: (res: DeleteMessageResponse) => void
) => {
  fetch(`/api/messages?id=${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res: DeleteMessageResponse) => cb(res));
};

const updateMessage = (
  id: string,
  data: { status: string },
  cb: (res: UpdateMessageResponse) => void
) => {
  fetch(`/api/messages?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res: UpdateMessageResponse) => cb(res));
};
