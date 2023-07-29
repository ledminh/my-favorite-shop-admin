import { useEffect, useState } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
};

export default function useControlPanel({
  initSortBy,
  initOrder,
  initSearchTerm,
  sortByOptions,
}: Props) {
  /*********************
   * Private
   */

  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // States
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

    params.set("searchTerm", searchTerm);

    router.push(`${pathname}?${params.toString()}`);
  }, [sortByID, orderID, searchTerm]);

  /*********************
   * Public
   */
  const onSearch = (searchTerm: string) => setSearchTerm(searchTerm);
  const onClearSearch = () => setSearchTerm("");

  return {
    searchTerm,
    onSearch,
    onClearSearch,
    setSortByID,
    setOrderID,
    orderOptions,
  };
}
