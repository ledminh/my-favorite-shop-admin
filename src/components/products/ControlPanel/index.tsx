"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";

import Filters from "@/components/Filters";
import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import { ReactNode } from "react";

import SearchTermTag from "@/components/SearchTermTag";

import useControlPanel from "./hooks";

type Props = {
  initSortBy: "name" | "price" | "createdAt" | "modifiedAt";
  initOrder: "asc" | "desc";

  initSearchTerm: string;
  sortByOptions: {
    id: "name" | "price" | "createdAt" | "modifiedAt";
    text: string;
    orderOptions: {
      id: "asc" | "desc";
      text: string;
    }[];
  }[];
  filterOptions: {
    id: "with-variants" | "with-promotion";
    text: string;
  }[];
  initFilterID: "with-variants" | "with-promotion" | null;
};

export default function ControlPanel({
  initSortBy,
  initOrder,
  initSearchTerm,
  sortByOptions,
  filterOptions,
  initFilterID,
}: Props) {
  const {
    filterID,
    searchTerm,
    onSearch,
    onClearSearch,
    setSortByID,
    setOrderID,
    orderOptions,
    onFilterChange,
  } = useControlPanel({
    initSortBy,
    initOrder,
    initSearchTerm,
    sortByOptions,
    initFilterID,
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {(searchTerm !== "" || filterID !== null) && (
          <div className="flex gap-2 p-2 bg-gray-200 rounded-lg basis-full">
            {searchTerm !== "" && (
              <SearchTermTag onClearSearch={onClearSearch}>
                {searchTerm}
              </SearchTermTag>
            )}
            {filterID === "with-variants" && (
              <FilterTag onClearFilter={() => onFilterChange(null)}>
                with Variants
              </FilterTag>
            )}
            {filterID === "with-promotion" && (
              <FilterTag onClearFilter={() => onFilterChange(null)}>
                with Promotion
              </FilterTag>
            )}
          </div>
        )}

        <div className="basis-[30px]">
          <Filters filterOptions={filterOptions} onChange={onFilterChange} />
        </div>
        <div className="basis-[calc(100%-60px)] md:basis-[calc(47%-60px)]">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="basis-full md:basis-[48.67%]">
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
const FilterTag = ({
  children,
  onClearFilter,
}: {
  children: ReactNode;
  onClearFilter: () => void;
}) => (
  <span className="inline-flex items-center overflow-hidden text-sm font-medium text-white bg-gray-700 rounded-md">
    <span className="inline-block px-2 py-2">{children}</span>
    <span className="inline-block pr-1">
      <button
        className="inline-flex items-center justify-center w-6 h-6 text-white rounded-full focus:ring-1 focus:ring-gray-800 hover:bg-gray-950 focus:outline-none"
        onClick={onClearFilter}
      >
        <span className="sr-only">Remove filter</span>
        <XMarkIcon className="w-4 h-4" />
      </button>
    </span>
  </span>
);
