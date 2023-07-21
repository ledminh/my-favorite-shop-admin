"use client";

import { WithID } from "@/types";
import ItemCard from "@/components/layout/CatProdList/ItemCard";

import { FC, useEffect, useState } from "react";
import { itemsPerPage } from "@/config";

type CatProdListProps<T> = {
  initItems: WithID<T>[];
  total: number;
  onLoadMore: ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => Promise<WithID<T>[]>;
  getImage: (item: WithID<T>) => { src: string; alt: string };
  CardContent: FC<{ item: WithID<T> }>;
  EditModal: FC<{
    item: WithID<T>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }>;

  DeleteModal: FC<{
    item: WithID<T>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }>;
};

export default function CatProdList<T>({
  initItems,
  total,
  onLoadMore,
  getImage,
  CardContent,
  EditModal,
  DeleteModal,
}: CatProdListProps<T>) {
  const [items, setItems] = useState(initItems);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<WithID<T> | null>(null);

  const onEdit = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      setCurrentItem(item);
      setIsEditModalOpen(true);
    }
  };

  const onDelete = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      setCurrentItem(item);
      setIsDeleteModalOpen(true);
    }
  };

  const _onLoadMore = () => {
    onLoadMore({
      offset: items.length,
      limit: itemsPerPage,
    }).then((newItems) => {
      setItems((prevItems) => [...prevItems, ...newItems]);
    });
  };

  useEffect(() => {
    setItems(initItems);
  }, [initItems]);

  return (
    <>
      {
        // Show item modal if currentItem is not null
        currentItem && (
          <EditModal
            item={currentItem}
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
          />
        )
      }

      {
        // Show delete modal if currentItem is not null
        currentItem && (
          <DeleteModal
            item={currentItem}
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
          />
        )
      }

      <div className="flex flex-col justify-center gap-8">
        <ul className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-start md:gap-x-[4%] lg:gap-x-[3.5%] xl:gap-x-[2.66%]">
          {items.map((item) => {
            return (
              <li
                key={item.id}
                className="overflow-hidden border rounded-lg border-blue-950 md:basis-[48%] lg:basis-[31%] xl:basis-[23%]"
              >
                <ItemCard
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  getImage={getImage}
                  CardContent={CardContent}
                />
              </li>
            );
          })}
        </ul>
        {
          // Show load more button if there are more items to load
          items.length < total && <LoadMoreButton onClick={_onLoadMore} />
        }
      </div>
    </>
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
