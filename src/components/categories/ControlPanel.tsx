"use client";

import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (searchTerm: string) => setSearchTerm(searchTerm);

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
const FilterTag = ({ children }: { children: ReactNode }) => (
  <span className="px-2 py-1 text-sm font-medium text-white bg-gray-700 rounded-md">
    {children}
  </span>
);
