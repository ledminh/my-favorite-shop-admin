import { WithID, Order, OrderStatus } from "@/types";

export type Props = {
  initOrders: WithID<Order>[];
  total: number;
  sortBy: "customer" | "price" | "createdAt" | "modifiedAt";
  sortedOrder: "asc" | "desc";
  searchTerm: string;
  filter: OrderStatus | null;
};
