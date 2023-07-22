"use client";
import { WithID } from "@/types";

import { FC, useState } from "react";

type Props<T> = {
  initItems: WithID<T>[];
  total: number;
  ItemTab: FC<{
    item: WithID<T>;
    setIsModalOpen: (isOpen: boolean) => void;
    setCurrentItem: (item: WithID<T>) => void;
  }>;
  ItemModal: FC<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    item: WithID<T>;
  }>;
  getTotalPrice?: (item: T[]) => number;
};

export default function OrderMessList<T>({
  initItems,
  total,
  ItemTab,
  ItemModal,
  getTotalPrice,
}: Props<T>) {
  const [items, setItems] = useState(initItems); // [WithID<T>[], (items: WithID<T>[]) => void
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<WithID<T> | null>(null);

  const loadMore = () => {
    console.log("load more");
  };

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
          {total > items.length && (
            <div className="flex justify-center pt-4">
              <Button label="Load More" onClick={loadMore} />
            </div>
          )}
        </ul>
        {getTotalPrice && (
          <div className="flex justify-end p-4 text-xl font-bold text-blue-950">
            Total: ${getTotalPrice(items).toFixed(2)}
          </div>
        )}
      </div>

      {currentItem && (
        <ItemModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          item={currentItem}
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
