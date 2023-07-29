"use client";

import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import { XMarkIcon } from "@heroicons/react/20/solid";

import { ReactNode } from "react";
import useControlPanel from "./hooks";

type Props = {
  initSortBy: "name" | "createdAt" | "modifiedAt";
  initOrder: "asc" | "desc";
  initSearchTerm: string;
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
  initSearchTerm,
  sortByOptions,
}: Props) {
  const {
    searchTerm,
    onClearSearch,
    onSearch,
    setSortByID,
    setOrderID,
    orderOptions,
  } = useControlPanel({
    initSortBy,
    initOrder,
    initSearchTerm,
    sortByOptions,
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {searchTerm !== "" && (
          <div className="p-2 bg-gray-200 rounded-lg basis-full">
            <SearchTermTag onClearSearch={onClearSearch}>
              {searchTerm}
            </SearchTermTag>
          </div>
        )}
        <div className="basis-full md:basis-[48%] xl:basis-[48.67%]">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="basis-full md:basis-[48%] xl:basis-[48.67%]">
          <Sorts
            setSortByID={setSortByID}
            setOrderID={setOrderID}
            sortByOptions={sortByOptions}
            orderOptions={orderOptions}
          />
        </div>
      </div>
    </>
  );
}

/***********************
 * Styles
 */
const SearchTermTag = ({
  children,
  onClearSearch,
}: {
  children: ReactNode;
  onClearSearch: () => void;
}) => (
  <span className="inline-flex items-center overflow-hidden text-sm font-medium text-white bg-gray-700 rounded-md">
    <span className="inline-block px-2 py-2 bg-red-950">Search Term</span>
    <span className="inline-block px-2 py-2">{children}</span>
    <span className="inline-block pr-1">
      <button
        className="inline-flex items-center justify-center w-6 h-6 text-white rounded-full focus:ring-1 focus:ring-gray-800 hover:bg-gray-950 focus:outline-none"
        onClick={onClearSearch}
      >
        <span className="sr-only">Remove search term</span>
        <XMarkIcon className="w-4 h-4" />
      </button>
    </span>
  </span>
);
