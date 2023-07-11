"use client";
import { WithID } from "@/types";
import { FC, useState } from "react";

type Props<T> = {
  initItems: WithID<T>[];
  total: number;
  ItemTab: FC<{ item: T }>;
};

export default function OrderMessList<T>({
  initItems,
  total,
  ItemTab,
}: Props<T>) {
  const [items, setItems] = useState(initItems);

  return (
    <div>
      <ul className="p-4 bg-orange-100 border-double border-y-4 border-blue-950">
        {items.map((item) => (
          <li key={item.id} className="py-2 border-b border-blue-950">
            <ItemTab item={item} />
          </li>
        ))}
      </ul>
      {total > items.length && <button>Load more</button>}
    </div>
  );
}
