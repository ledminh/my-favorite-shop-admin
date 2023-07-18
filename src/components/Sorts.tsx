"use client";

import Select from "@/components/layout/Select";
import { useEffect, useState } from "react";

const sortByOptions = [
  {
    id: "name",
    text: "Name",
    orderOptions: [
      {
        id: "asc",
        text: "A to Z",
      },
      {
        id: "desc",
        text: "Z to A",
      },
    ],
  },
  {
    id: "price",
    text: "Price",
    orderOptions: [
      {
        id: "asc",
        text: "Low to High",
      },
      {
        id: "desc",
        text: "High to Low",
      },
    ],
  },
  {
    id: "create-at",
    text: "Create At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
  {
    id: "modified-at",
    text: "Modified At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
];

export default function Sorts() {
  const [sortByID, setSortByID] = useState(sortByOptions[0].id);

  const [orderOptions, setOrderOptions] = useState(
    sortByOptions[0].orderOptions
  );

  const [orderID, setOrderID] = useState(orderOptions[0].id);

  const sortByOnChange = (id: string) => setSortByID(id);

  const orderOnChange = (id: string) => setOrderID(id);

  useEffect(() => {
    const orderOptions = sortByOptions.find((option) => option.id === sortByID);

    if (orderOptions) {
      setOrderOptions(orderOptions.orderOptions);
    }
  }, [sortByID]);

  useEffect(() => {}, [sortByID, orderID]);

  return (
    <div className="flex justify-between">
      <div className="basis-[47%] flex flex-col gap-2 sm:flex-row">
        <label
          htmlFor="sortBy"
          className="hidden text-sm font-semibold sm:basis-1/3"
        >
          Sort by
        </label>
        <Select
          id="sortBy"
          options={sortByOptions}
          defaultValue={sortByOptions[0].id}
          onChange={sortByOnChange}
        />
      </div>
      <div className="basis-[47%] flex flex-col gap-2 sm:flex-row">
        <label
          htmlFor="order"
          className="hidden text-sm font-semibold sm:basis-1/3"
        >
          Order
        </label>
        <Select
          id="order"
          options={orderOptions}
          defaultValue={orderOptions[0].id}
          onChange={orderOnChange}
        />
      </div>
    </div>
  );
}
