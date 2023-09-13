import { OrderResponse, WithID, Order } from "@/types";

const deleteOrder = async (id: string) => {
  const { data, errorMessage } = (await fetch("/api/orders?action=delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  }).then((res) => res.json())) as OrderResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  const deletedOrder = {
    ...data,
    createdAt: new Date(data.createdAt),
    modifiedAt: new Date(data.modifiedAt),
  } as WithID<Order>;

  return deletedOrder;
};

export default deleteOrder;
