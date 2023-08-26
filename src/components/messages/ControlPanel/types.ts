import { CustomerMessageStatus } from "@/types";

export type Props = {
  initSortBy: "customer" | "email" | "createdAt";
  initOrder: "asc" | "desc";
  initSearchTerm: string;
  sortByOptions: {
    id: "customer" | "email" | "createdAt";
    text: string;
    orderOptions: {
      id: "asc" | "desc";
      text: string;
    }[];
  }[];
  filterOptions: {
    id: CustomerMessageStatus;
    text: string;
  }[];
  initFilterID: CustomerMessageStatus | null;
};
