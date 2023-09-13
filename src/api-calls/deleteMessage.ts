import { MessageResponse, WithID, CustomerMessage } from "@/types";

const deleteOrder = async (id: string) => {
  const { data, errorMessage } = (await fetch("/api/messages?action=delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  }).then((res) => res.json())) as MessageResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  const deletedOrder = {
    ...data,
    createdAt: new Date(data.createdAt),
  } as WithID<CustomerMessage>;

  return deletedOrder;
};

export default deleteOrder;
