"use client";

import { WithID } from "@/types";
import ItemTab from "@/components/layout/ItemTab";
import { FC } from "react";

type CatProdListProps<T> = {
  items: WithID<T>[];
  total: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onLoadMore: () => void;
  getImage: (item: WithID<T>) => { src: string; alt: string };
  ItemTabContent: FC<{ item: WithID<T> }>;
};

export default function CatProdList<T>({
  items,
  total,
  onEdit,
  onDelete,
  getImage,
  ItemTabContent,
  onLoadMore,
}: CatProdListProps<T>) {
  return (
    <div className="flex flex-col justify-center gap-8">
      <ul className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-start md:gap-x-[4%] lg:gap-x-[3.5%] xl:gap-x-[2.66%]">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="overflow-hidden border rounded-lg border-blue-950 md:basis-[48%] lg:basis-[31%] xl:basis-[23%]"
            >
              <ItemTab
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                getImage={getImage}
                Content={ItemTabContent}
              />
            </li>
          );
        })}
      </ul>
      <LoadMoreButton onClick={onLoadMore} />
    </div>
  );
}

/**************************
 * Components
 */
type LoadMoreButtonProps = {
  onClick: () => void;
};

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => (
  <button
    className="w-40 py-3 m-auto text-lg font-bold border-2 rounded-lg border-blue-950 hover:bg-gray-200 hover:ring hover:ring-gray-600 active:ring active:ring-gray-600 active:bg-gray-300"
    onClick={onClick}
  >
    LOAD MORE
  </button>
);
