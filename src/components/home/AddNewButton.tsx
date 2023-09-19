/***********************
 * Description:
 *  AddNewButton component
 * This component is the general button for adding new item (category and product) used in the home page.
 */
"use client";

import { WithID, Category } from "@/types";
import { useState } from "react";
import Button from "./Button";

import { useRouter } from "next/navigation";

type Props<T> = {
  title: string;
  notificationTitle: string;
  NotificationContent: React.FC<{ item: WithID<T> }>;
} & (
  | {
      NewModal: React.FC<{
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
        afterAdd: (item: WithID<T>) => void;
        setLoading: (loading: boolean) => void;
        categories: WithID<Category>[];
      }>;
      categories: WithID<Category>[];
    }
  | {
      NewModal: React.FC<{
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
        afterAdd: (item: WithID<T>) => void;
        setLoading: (loading: boolean) => void;
      }>;
      categories?: never;
    }
);

export default function AddNewButton<T>({
  title,
  NewModal,
  notificationTitle,
  NotificationContent,
  categories,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState<WithID<T> | null>(null);

  const router = useRouter();

  const afterAdd = (item: WithID<T>) => {
    setLoading(false);
    setNewItem(item);

    router.refresh();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        classNames="flex justify-center items-centers"
      >
        <span>{title}</span>
        {loading && <ThreeDots />}
      </Button>
      {categories ? (
        <NewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          afterAdd={afterAdd}
          setLoading={setLoading}
          categories={categories}
        />
      ) : (
        <NewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          afterAdd={afterAdd}
          setLoading={setLoading}
        />
      )}

      {newItem && (
        <Notification
          onClose={() => setNewItem(null)}
          item={newItem}
          title={notificationTitle}
          Content={NotificationContent}
        />
      )}
    </>
  );
}

/**************************
 * Components
 */

const ThreeDots = () => (
  <div className="flex items-center justify-between ml-4">
    <div className="w-2 h-2 mr-1 bg-gray-600 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 mr-1 bg-gray-600 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
  </div>
);

function Notification<T>({
  onClose,
  item,
  title,
  Content,
}: {
  onClose: () => void;
  item: WithID<T>;
  title: string;
  Content: React.FC<{ item: WithID<T> }>;
}) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 mb-4 mr-4 bg-gray-700 rounded-lg w-96 shadow-stone-800">
      <div className="flex items-center justify-between">
        <span className="font-bold text-white">{title}</span>
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white hover:text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Content item={item} />
    </div>
  );
}
