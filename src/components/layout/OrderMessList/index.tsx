"use client";
import { WithID } from "@/types";

import { FC, useState, useEffect } from "react";

import { itemsPerPage } from "@/config";

type Props<T> = {
  initItems: WithID<T>[];
  total: number;
  onLoadMore: ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => Promise<WithID<T>[]>;

  ItemTab: FC<{
    item: WithID<T>;
    setIsModalOpen: (isOpen: boolean) => void;
    setCurrentItem: (item: WithID<T>) => void;
  }>;
  ItemModal: FC<{
    initItem: WithID<T>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    afterDelete: (o: WithID<T>) => void;
    afterUpdate: (o: WithID<T>) => void;
  }>;
  getTotalPrice?: (item: T[]) => number;

  afterDelete: (o: WithID<T>) => void;
  afterUpdate: (o: WithID<T>) => void;
};

export default function OrderMessList<T>({
  initItems,
  total,
  onLoadMore,
  ItemTab,
  ItemModal,
  getTotalPrice,
  afterDelete,
  afterUpdate,
}: Props<T>) {
  const [items, setItems] = useState(initItems); // [WithID<T>[], (items: WithID<T>[]) => void
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<WithID<T> | null>(null);

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

    setCurrentItem((prev) => {
      if (!prev) return null;

      const found = initItems.find((item) => item.id === prev.id);

      if (found) return found;

      return null;
    });
  }, [initItems]);

  return (
    <>
      <div>
        <ul className="p-4 bg-orange-100 border-double border-y-4 border-blue-950 max-h-[70vh] overflow-y-scroll">
          {items.map((item) => (
            <li key={item.id} className="py-2 border-b border-blue-950">
              <ItemTab
                item={item}
                setIsModalOpen={setIsModalOpen}
                setCurrentItem={setCurrentItem}
              />
            </li>
          ))}
          {items.length === 0 && (
            <div className="flex justify-center pt-4">
              <p className="text-xl font-bold text-blue-950">No items</p>
            </div>
          )}
          {total > items.length && (
            <div className="flex justify-center pt-4">
              <Button label="Load More" onClick={_onLoadMore} />
            </div>
          )}
        </ul>
        {getTotalPrice && (
          <div className="flex justify-end p-4 text-xl font-bold text-blue-950">
            Total: ${getTotalPrice(items).toLocaleString()} ({items.length} item
            {items.length > 1 ? "s" : ""} / {total} item{total > 1 ? "s" : ""})
          </div>
        )}
      </div>

      {currentItem && (
        <ItemModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          initItem={currentItem}
          afterDelete={afterDelete}
          afterUpdate={afterUpdate}
        />
      )}
    </>
  );
}

/**************************
 * Components
 */
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2 font-semibold bg-orange-300 border-2 border-double border-blue-950 hover:bg-orange-400 active:bg-orange-300"
    >
      {label}
    </button>
  );
};
