"use client";
import { WithID } from "@/types";
import ItemTab from "./ItemTab";
import { useState } from "react";

type Props<T> = {
  initItems: WithID<T>[];
  total: number;
};

export default function OrderMessList<T>({ initItems, total }: Props<T>) {
  const [items, setItems] = useState(initItems);

  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ItemTab item={item} />
          </li>
        ))}
      </ul>
      {total > items.length && <button>Load more</button>}
    </>
  );
}
