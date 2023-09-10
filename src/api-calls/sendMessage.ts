import { CustomerMessage, MessageResponse } from "@/types";

export default async function sendMessage(
  message: Omit<CustomerMessage, "status" | "createdAt">
) {
  const { errorMessage } = (await fetch("/api/messages?action=add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  }).then((res) => res.json())) as MessageResponse;

  if (errorMessage) {
    throw new Error(errorMessage);
  }
}
