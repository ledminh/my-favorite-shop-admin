import { CustomerMessage, CustomerMessageStatus, WithID } from "@/types";

import prismaClient from "../prismaClient";

export async function addMessage(
  message: Omit<CustomerMessage, "id" | "createdAt">
): Promise<WithID<CustomerMessage>> {
  const newMessage = await prismaClient.customerMessage.create({
    data: {
      ...message,
      status: "unread",
    },
  });

  return {
    id: newMessage.id,
    firstName: newMessage.firstName,
    lastName: newMessage.lastName,
    email: newMessage.email,
    phone: newMessage.phone === null ? undefined : newMessage.phone,
    message: newMessage.message,
    status: newMessage.status as CustomerMessageStatus,
    createdAt: newMessage.createdAt,
  };
}

// type getCustomerMessagesProps = {
//   offset: number;
//   limit: number;
//   sortedBy: "customer" | "email" | "createdAt";
//   sortedOrder: "asc" | "desc";
//   searchTerm?: string;
//   filter: CustomerMessageStatus | null;
// };

// export function getCustomerMessages({
//   offset,
//   limit,
//   sortedBy,
//   sortedOrder,
//   searchTerm,
//   filter,
// }: getCustomerMessagesProps): Promise<{
//   items: WithID<CustomerMessage>[];
//   total: number;
// }> {}

// export function updateMessage(
//   id: string,
//   status: CustomerMessageStatus
// ): Promise<WithID<CustomerMessage>> {}

// export function deleteMessage(id: string): Promise<WithID<CustomerMessage>> {}
