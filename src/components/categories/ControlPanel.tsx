"use client";

import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import { ReactNode } from "react";

type Props = {
  initSortBy: "name" | "createdAt" | "modifiedAt";
  initOrder: "asc" | "desc";
  sortByOptions: {
    id: "name" | "createdAt" | "modifiedAt";
    text: string;
    orderOptions: {
      id: "asc" | "desc";
      text: string;
    }[];
  }[];
};

export default function ControlPanel({
  initSortBy,
  initOrder,
  sortByOptions,
}: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* {variants ||
          (promotion && (
            <div className="p-2 bg-gray-200 rounded-lg basis-full">
              {variants && <FilterTag>with Variants</FilterTag>}
              {promotion && <FilterTag>with Promotion</FilterTag>}
            </div>
          ))} */}
        <div className="basis-full md:basis-[48%] xl:basis-[48.67%]">
          <SearchBar />
        </div>
        <div className="basis-full md:basis-[48%] xl:basis-[48.67%]">
          <Sorts
            initSortBy={initSortBy}
            initOrder={initOrder}
            sortByOptions={sortByOptions}
          />
        </div>
      </div>
    </>
  );
}

/***********************
 * Styles
 */
const FilterTag = ({ children }: { children: ReactNode }) => (
  <span className="px-2 py-1 text-sm font-medium text-white bg-gray-700 rounded-md">
    {children}
  </span>
);
