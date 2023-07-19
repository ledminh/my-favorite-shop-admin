"use client";
import { WithID } from "@/types";

import { FC, useState } from "react";

type Props<T> = {
  initItems: WithID<T>[];
  total: number;
  ItemTab: FC<{ item: WithID<T> }>;
  getTotalPrice?: (item: T[]) => number;
};

export default function OrderMessList<T>({
  initItems,
  total,
  ItemTab,
  getTotalPrice,
}: Props<T>) {
  const [items, setItems] = useState(initItems);

  return (
    <div>
      <ul className="p-4 bg-orange-100 border-double border-y-4 border-blue-950 max-h-[70vh] overflow-y-scroll">
        {items.map((item) => (
          <li key={item.id} className="py-2 border-b border-blue-950">
            <ItemTab item={item} />
          </li>
        ))}
        {total > items.length && <button>Load more</button>}
      </ul>
      {getTotalPrice && (
        <div className="flex justify-end p-4 text-xl font-bold text-blue-950">
          Total: ${getTotalPrice(items).toFixed(2)}
        </div>
      )}
    </div>
  );
}
