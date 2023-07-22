import { useEffect, useState } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  initSortBy: "firstName" | "lastName" | "createdAt" | "email";
  initOrder: "asc" | "desc";
  sortByOptions: {
    id: "firstName" | "lastName" | "createdAt" | "email";
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
  sortByOptions,
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

  return {
    onSearch,
    setSortByID,
    setOrderID,
    orderOptions,
  };
}
