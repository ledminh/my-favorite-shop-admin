"use client";

import { WithID, Category } from "@/types";

import NewCatModal from "@/components/modals/NewCategory";
import Image from "next/image";
import AddNewButton from "./AddNewButton";

export default function NewCatButton() {
  return (
    <AddNewButton
      title="ADD NEW CATEGORY"
      NewModal={NewCatModal}
      notificationTitle="Category Added"
      NotificationContent={NotificationContent}
    />
  );
}

/**************************
 * Components
 */

const NotificationContent = ({ item }: { item: WithID<Category> }) => {
  return (
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
  );
};
