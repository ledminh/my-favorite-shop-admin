"use client";

import { WithID, Category } from "@/types";
import { useState } from "react";
import Button from "./Button";
import NewCatModal from "@/components/modals/NewCategory";
import Image from "next/image";

export default function NewCatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState<WithID<Category> | null>(null);

  const afterAdd = (item: WithID<Category>) => {
    setLoading(false);
    setNewCategory(item);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        classNames="flex justify-center items-centers"
      >
        <span>ADD NEW CATEGORY</span>
        {loading && <ThreeDots />}
      </Button>
      <NewCatModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        afterAdd={afterAdd}
        setLoading={setLoading}
      />
      {newCategory && (
        <Notification onClose={() => setNewCategory(null)} item={newCategory} />
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

const Notification = ({
  onClose,
  item,
}: {
  onClose: () => void;
  item: WithID<Category>;
}) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 mb-4 mr-4 bg-gray-700 rounded-lg w-96 shadow-stone-800">
      <div className="flex items-center justify-between">
        <span className="font-bold text-white">Category Added</span>
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
      <div className="flex items-center justify-start gap-4 mt-2">
        <div className="relative w-20 h-20 overflow-hidden rounded-2xl">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-white">{item.name}</span>
          <span className="text-xs text-white">
            {item.description.length > 20
              ? item.description.substring(0, 20) + "..."
              : item.description}
          </span>
        </div>
      </div>
    </div>
  );
};
