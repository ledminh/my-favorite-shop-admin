"use client";

import Filters from "@/components/Filters";
import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import { ReactNode, useState, useEffect } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  initSortBy: "name" | "price" | "createdAt" | "modifiedAt";
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
  sortByOptions,
  initSortBy,
  initOrder,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortByID, setSortByID] = useState(initSortBy);
  const [orderID, setOrderID] = useState(initOrder);

  const [orderOptions, setOrderOptions] = useState(
    sortByOptions.find((option) => option.id === initSortBy)?.orderOptions ||
      sortByOptions[0].orderOptions
  );

  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (searchTerm: string) => setSearchTerm(searchTerm);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortByID);
    params.set("order", orderID);

    if (searchTerm !== "") {
      params.set("search", searchTerm);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [sortByID, orderID, searchTerm]);

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
        <div className="basis-[30px]">
          <Filters />
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
const FilterTag = ({ children }: { children: ReactNode }) => (
  <span className="px-2 py-1 text-sm font-medium text-white bg-gray-700 rounded-md">
    {children}
  </span>
);
