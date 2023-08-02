"use client";

import Filters from "@/components/Filters";
import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import SearchTermTag from "@/components/SearchTermTag";
import FilterTag from "@/components/FilterTag";

import { ReactNode } from "react";

import useControlPanel from "./hooks";
import { OrderStatus } from "@/types";

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
    id: OrderStatus;
    text: string;
  }[];
  initFilterID: OrderStatus | null;
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
            {filterID !== null && (
              <FilterTag onClearFilter={() => onFilterChange(null)}>
                {filterOptions.find((option) => option.id === filterID)?.text}
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
