import { WithID, CustomerMessage, CustomerMessageStatus } from "@/types";

export type Props = {
  initMessages: WithID<CustomerMessage>[];
  total: number;
  sortedBy: "customer" | "email" | "createdAt";
  sortedOrder: "asc" | "desc";
  searchTerm: string;
  filter: CustomerMessageStatus | null;
};
