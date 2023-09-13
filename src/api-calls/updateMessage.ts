import {
  MessageResponse,
  WithID,
  CustomerMessageStatus,
  CustomerMessage,
} from "@/types";

const updateMessage = async (id: string, status: CustomerMessageStatus) => {
  const { data, errorMessage } = (await fetch("/api/messages?action=edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      status,
    }),
  }).then((res) => res.json())) as MessageResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  const updatedOrder = {
    ...data,
    createdAt: new Date(data.createdAt),
  } as WithID<CustomerMessage>;

  return updatedOrder;
};

export default updateMessage;
