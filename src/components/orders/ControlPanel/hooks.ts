import { useEffect, useState } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  initFilterID: OrderStatus | null;
};

export default function useControlPanel({
  initSortBy,
  initOrder,
  initSearchTerm,
  sortByOptions,
  initFilterID,
}: Props) {
  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // States
  const [filterID, setFilterID] = useState(initFilterID);
  const [sortByID, setSortByID] = useState(initSortBy);
  const [orderID, setOrderID] = useState(initOrder);

  const [orderOptions, setOrderOptions] = useState(
    sortByOptions.find((option) => option.id === initSortBy)?.orderOptions ||
      sortByOptions[0].orderOptions
  );

  const [searchTerm, setSearchTerm] = useState(initSearchTerm);

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

    if (searchTerm !== "") params.set("searchTerm", searchTerm);
    else params.delete("searchTerm");

    if (filterID !== null) params.set("filter", filterID);
    else params.delete("filter");

    router.push(`${pathname}?${params.toString()}`);
  }, [sortByID, orderID, searchTerm, filterID]);

  /*********************
   * Public
   */
  const onSearch = (searchTerm: string) => setSearchTerm(searchTerm);
  const onClearSearch = () => setSearchTerm("");
  const onFilterChange = (filterID: OrderStatus | null) =>
    setFilterID(filterID);

  return {
    filterID,
    searchTerm,
    onSearch,
    onClearSearch,
    setSortByID,
    setOrderID,
    orderOptions,
    onFilterChange,
  };
}
