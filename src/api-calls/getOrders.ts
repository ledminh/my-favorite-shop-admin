import { OrdersRequest, OrdersResponse } from "@/types";

const getOrders = async (req: OrdersRequest) => {
  const { offset, limit, sortBy, order, searchTerm, filter } = req;

  const res = await fetch(
    `/api/orders?type=multiple${offset ? "&offset=" + offset : ""}${
      limit ? "&limit=" + limit : ""
    }&sortBy=${sortBy}&order=${order}${
      searchTerm ? "&searchTerm=" + searchTerm : ""
    }${filter ? "&filter=" + filter : ""}`
  );

  const { errorMessage, data } = (await res.json()) as OrdersResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  return {
    orders: data.orders.map((order) => ({
      ...order,
      createdAt: new Date(order.createdAt),
      modifiedAt: new Date(order.modifiedAt),
    })),
    total: data.total,
  };
};

export default getOrders;
