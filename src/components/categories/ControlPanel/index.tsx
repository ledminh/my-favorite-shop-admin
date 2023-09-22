"use client";

import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import SearchTermTag from "@/components/SearchTermTag";
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
            defaultOrderID={initOrder}
            defaultSortByID={initSortBy}
          />
        </div>
      </div>
    </>
  );
}
