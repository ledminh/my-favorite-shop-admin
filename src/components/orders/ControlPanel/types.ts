import { OrderStatus } from "@/types";

export type Props = {
  initSortBy: "customer" | "price" | "createdAt" | "modifiedAt";
  initOrder: "asc" | "desc";
  initSearchTerm: string;

  sortByOptions: {
    id: "customer" | "price" | "createdAt" | "modifiedAt";
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
