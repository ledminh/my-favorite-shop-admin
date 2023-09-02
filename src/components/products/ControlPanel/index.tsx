"use client";

import Filters from "@/components/Filters";
import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import SearchTermTag from "@/components/SearchTermTag";
import FilterTag from "@/components/FilterTag";
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
    sortByID,
    orderID,
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
            defaultSortByID={sortByID}
            defaultOrderID={orderID}
            sortByOptions={sortByOptions}
            orderOptions={orderOptions}
          />
        </div>
      </div>
    </>
  );
}
