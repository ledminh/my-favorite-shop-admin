import {
  CustomerMessage,
  CustomerMessageStatus,
  MessagesRequest,
  WithID,
} from "@/types";

import prismaClient from "../prismaClient";

// export async function addMessage(
//   message: Omit<CustomerMessage, "id" | "createdAt">
// ): Promise<WithID<CustomerMessage>> {
//   const newMessage = await prismaClient.customerMessage.create({
//     data: {
//       ...message,
//       status: "unread",
//     },
//   });

//   return {
//     id: newMessage.id,
//     firstName: newMessage.firstName,
//     lastName: newMessage.lastName,
//     email: newMessage.email,
//     phone: newMessage.phone === null ? undefined : newMessage.phone,
//     message: newMessage.message,
//     status: newMessage.status as CustomerMessageStatus,
//     createdAt: newMessage.createdAt,
//   };
// }

export function getCustomerMessages({
  offset,
  limit,
  sortBy,
  order,
  searchTerm,
  filter,
}: MessagesRequest): Promise<{
  items: WithID<CustomerMessage>[];
  total: number;
}> {
  return prismaClient.$transaction(async (prisma) => {
    const messages = await prisma.customerMessage.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      where: {
        status: filter === null ? undefined : filter,
        ...(searchTerm && {
          OR: [
            {
              firstName: {
                contains: searchTerm,
              },
            },
            {
              lastName: {
                contains: searchTerm,
              },
            },
            {
              email: {
                contains: searchTerm,
              },
            },
            {
              phone: {
                contains: searchTerm,
              },
            },
            {
              message: {
                contains: searchTerm,
              },
            },
          ],
        }),
      },
    });

    const total = await prisma.customerMessage.count({
      where: {
        status: filter === null ? undefined : filter,
        ...(searchTerm && {
          OR: [
            {
              firstName: {
                contains: searchTerm,
              },
            },
            {
              lastName: {
                contains: searchTerm,
              },
            },
            {
              email: {
                contains: searchTerm,
              },
            },
            {
              phone: {
                contains: searchTerm,
              },
            },
            {
              message: {
                contains: searchTerm,
              },
            },
          ],
        }),
      },
    });

    return {
      items: messages.map((message) => ({
        id: message.id,
        firstName: message.firstName,
        lastName: message.lastName,
        email: message.email,
        phone: message.phone === null ? undefined : message.phone,
        message: message.message,
        status: message.status as CustomerMessageStatus,
        createdAt: message.createdAt,
      })),
      total,
    };
  });
}

export function updateMessage(
  id: string,
  status: CustomerMessageStatus
): Promise<WithID<CustomerMessage>> {
  return prismaClient.$transaction(async (prisma) => {
    const updatedMessage = await prisma.customerMessage.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return {
      id: updatedMessage.id,
      firstName: updatedMessage.firstName,
      lastName: updatedMessage.lastName,
      email: updatedMessage.email,
      phone: updatedMessage.phone === null ? undefined : updatedMessage.phone,
      message: updatedMessage.message,
      status: updatedMessage.status as CustomerMessageStatus,
      createdAt: updatedMessage.createdAt,
    };
  });
}

export function deleteMessage(id: string): Promise<WithID<CustomerMessage>> {
  return prismaClient.$transaction(async (prisma) => {
    const deletedMessage = await prisma.customerMessage.delete({
      where: {
        id,
      },
    });

    return {
      id: deletedMessage.id,
      firstName: deletedMessage.firstName,
      lastName: deletedMessage.lastName,
      email: deletedMessage.email,
      phone: deletedMessage.phone === null ? undefined : deletedMessage.phone,
      message: deletedMessage.message,
      status: deletedMessage.status as CustomerMessageStatus,
      createdAt: deletedMessage.createdAt,
    };
  });
}
