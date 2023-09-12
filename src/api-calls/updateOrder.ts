import { OrderResponse, WithID, Order, OrderStatus } from "@/types";

const updateOrder = async (id: string, status: OrderStatus) => {
  const { data, errorMessage } = (await fetch("/api/orders?action=edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      status,
    }),
  }).then((res) => res.json())) as OrderResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const updatedOrder = data as WithID<Order>;

  return updatedOrder;
};

export default updateOrder;
