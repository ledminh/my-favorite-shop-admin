"use client";

import Select from "@/components/layout/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  sortByOptions: {
    id: "name" | "createdAt" | "modifiedAt";
    text: string;
    orderOptions: {
      id: "asc" | "desc";
      text: string;
    }[];
  }[];
  initSortBy: "name" | "createdAt" | "modifiedAt";
  initOrder: "asc" | "desc";
};

export default function Sorts({ sortByOptions, initSortBy, initOrder }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // States
  const [sortByID, setSortByID] = useState(initSortBy);

  const [orderOptions, setOrderOptions] = useState(
    sortByOptions.find((option) => option.id === initSortBy)?.orderOptions ||
      sortByOptions[0].orderOptions
  );

  const [orderID, setOrderID] = useState(initOrder);

  // Effects
  useEffect(() => {
    const orderOptions = sortByOptions.find((option) => option.id === sortByID);

    if (orderOptions) {
      setOrderOptions(orderOptions.orderOptions);
    }
  }, [sortByID]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortByID);
    params.set("order", orderID);

    router.push(`${pathname}?${params.toString()}`);
  }, [sortByID, orderID]);

  // Event handlers
  const sortByOnChange = (id: string) =>
    setSortByID(id as "name" | "createdAt" | "modifiedAt");

  const orderOnChange = (id: string) => setOrderID(id as "asc" | "desc");

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
