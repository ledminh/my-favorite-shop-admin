import { useEffect, useState } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { CustomerMessageStatus } from "@/types";
import { Props } from "./";

export default function useControlPanel({
  initSortBy,
  initOrder,
  initSearchTerm,
  sortByOptions,
  filterOptions,
  initFilterID,
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

  const onSearch = (searchTerm: string) => setSearchTerm(searchTerm);
  const onFilterChange = (filter: CustomerMessageStatus | null) => {};

  return {
    onSearch,
    onFilterChange,
    setSortByID,
    setOrderID,
    orderOptions,
  };
}
