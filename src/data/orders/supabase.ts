import {
  OrderStatus,
  OrderToSubmit,
  Order,
  WithID,
  OrdersRequest,
} from "@/types";

// import getOrderPrice from "@/utils/getOrderPrice";

import prismaClient from "../prismaClient";

export async function addOrderToSubmit(
  order: WithID<OrderToSubmit>
): Promise<void> {
  await prismaClient.orderToSubmit.create({
    data: {
      id: order.id,
      shippingAddress: JSON.stringify(order.shippingAddress),
      orderedProducts: order.orderedProducts.map((orderedProduct) =>
        JSON.stringify(orderedProduct)
      ),
      status: order.status,
    },
  });
}

export async function deleteOrderToSubmit(id: string): Promise<void> {
  await prismaClient.orderToSubmit.delete({
    where: {
      id,
    },
  });
}

export async function getOrderToSubmit(
  id: string
): Promise<WithID<OrderToSubmit>> {
  const orderToSubmit = await prismaClient.orderToSubmit.findUnique({
    where: {
      id,
    },
  });

  if (!orderToSubmit) throw new Error("Order not found");

  return {
    id: orderToSubmit.id,
    shippingAddress: JSON.parse(orderToSubmit.shippingAddress),
    orderedProducts: orderToSubmit.orderedProducts.map((orderedProduct) =>
      JSON.parse(orderedProduct)
    ),
    status: orderToSubmit.status as OrderStatus,
  };
}

export async function addOrder(
  order: Omit<WithID<Order>, "createdAt" | "modifiedAt">
): Promise<WithID<Order>> {
  const orderDB = await prismaClient.order.create({
    data: {
      id: order.id,
      shippingAddress: JSON.stringify(order.shippingAddress),
      orderedProducts: order.orderedProducts.map((orderedProduct) =>
        JSON.stringify(orderedProduct)
      ),
      shippingFee: order.shippingFee,
      taxes: order.taxes,

      status: order.status,
    },
  });

  return {
    id: orderDB.id,
    shippingAddress: JSON.parse(
      orderDB.shippingAddress
    ) as WithID<Order>["shippingAddress"],
    orderedProducts: orderDB.orderedProducts.map((orderedProduct) =>
      JSON.parse(orderedProduct)
    ) as WithID<Order>["orderedProducts"],
    shippingFee: orderDB.shippingFee,
    taxes: orderDB.taxes,
    status: orderDB.status as OrderStatus,
    createdAt: orderDB.createdAt,
    modifiedAt: orderDB.modifiedAt,
  };
}

export async function getOrder(id: string): Promise<WithID<Order>> {
  const orderDB = await prismaClient.order.findUnique({
    where: {
      id,
    },
  });

  if (!orderDB) throw new Error("Order not found");

  return {
    id: orderDB.id,
    shippingAddress: JSON.parse(
      orderDB.shippingAddress
    ) as WithID<Order>["shippingAddress"],
    orderedProducts: orderDB.orderedProducts.map((orderedProduct) =>
      JSON.parse(orderedProduct)
    ) as WithID<Order>["orderedProducts"],
    shippingFee: orderDB.shippingFee,
    taxes: orderDB.taxes,
    status: orderDB.status as OrderStatus,
    createdAt: orderDB.createdAt,
    modifiedAt: orderDB.modifiedAt,
  };
}

export function getOrders({
  offset,
  limit,
  sortBy,
  order,
  searchTerm,
  filter,
}: OrdersRequest): Promise<{ items: WithID<Order>[]; total: number }> {
  return prismaClient.$transaction(async (prisma) => {
    const orders = await prisma.order.findMany({
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
              shippingAddress: {
                contains: searchTerm,
              },
            },
            {
              orderedProducts: {
                hasSome: [searchTerm],
              },
            },
            {
              id: {
                contains: searchTerm,
              },
            },
          ],
        }),
      },
    });

    const total = await prisma.order.count({
      where: {
        status: filter === null ? undefined : filter,
        ...(searchTerm && {
          OR: [
            {
              shippingAddress: {
                contains: searchTerm,
              },
            },
            {
              orderedProducts: {
                hasSome: [searchTerm],
              },
            },
            {
              id: {
                contains: searchTerm,
              },
            },
          ],
        }),
      },
    });

    return {
      items: orders.map((order) => ({
        id: order.id,
        shippingAddress: JSON.parse(
          order.shippingAddress
        ) as WithID<Order>["shippingAddress"],
        orderedProducts: order.orderedProducts.map((orderedProduct) =>
          JSON.parse(orderedProduct)
        ) as WithID<Order>["orderedProducts"],
        shippingFee: order.shippingFee,
        taxes: order.taxes,
        status: order.status as OrderStatus,
        createdAt: order.createdAt,
        modifiedAt: order.modifiedAt,
      })),
      total,
    };
  });
}

export function deleteOrder(id: string): Promise<WithID<Order>> {
  return prismaClient.$transaction(async (prisma) => {
    const order = await prisma.order.delete({
      where: {
        id,
      },
    });

    return {
      id: order.id,
      shippingAddress: JSON.parse(
        order.shippingAddress
      ) as WithID<Order>["shippingAddress"],
      orderedProducts: order.orderedProducts.map((orderedProduct) =>
        JSON.parse(orderedProduct)
      ) as WithID<Order>["orderedProducts"],
      shippingFee: order.shippingFee,
      taxes: order.taxes,
      status: order.status as OrderStatus,
      createdAt: order.createdAt,
      modifiedAt: order.modifiedAt,
    };
  });
}

export function updateOrder(
  id: string,
  status: OrderStatus
): Promise<WithID<Order>> {
  return prismaClient.$transaction(async (prisma) => {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return {
      id: order.id,
      shippingAddress: JSON.parse(
        order.shippingAddress
      ) as WithID<Order>["shippingAddress"],
      orderedProducts: order.orderedProducts.map((orderedProduct) =>
        JSON.parse(orderedProduct)
      ) as WithID<Order>["orderedProducts"],
      shippingFee: order.shippingFee,
      taxes: order.taxes,
      status: order.status as OrderStatus,
      createdAt: order.createdAt,
      modifiedAt: order.modifiedAt,
    };
  });
}
