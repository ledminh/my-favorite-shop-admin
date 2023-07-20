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
  orderOptions: {
    id: "asc" | "desc";
    text: string;
  }[];
  setSortByID: (id: "name" | "createdAt" | "modifiedAt") => void;
  setOrderID: (id: "asc" | "desc") => void;
};

export default function Sorts({
  sortByOptions,
  setSortByID,
  setOrderID,
  orderOptions,
}: Props) {
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
