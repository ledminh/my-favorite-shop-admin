import { faker } from "@faker-js/faker";

import {
  Order,
  OrderedProduct,
  OrderStatus,
  PaymentInfo,
  ShippingAddress,
  WithID,
} from "@/types";
import { _getProducts } from "./products";

const ORDERS = _getOrders(200);

type getOrdersProps = {
  offset: number;
  limit: number;
  status?: OrderStatus;
  sortedOrder: "newest" | "oldest";
};

export function getOrders({
  offset,
  limit,
  status,
  sortedOrder,
}: getOrdersProps): Promise<{ items: WithID<Order>[]; total: number }> {
  if (limit === 0) {
    return new Promise((resolve) =>
      resolve({
        items: [],
        total: ORDERS.length,
      })
    );
  }

  let orders = ORDERS;

  if (status) {
    orders = orders.filter((order) => order.status === status);
  }

  if (sortedOrder === "newest") {
    orders = orders.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } else if (sortedOrder === "oldest") {
    orders = orders.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  if (offset) {
    orders = orders.slice(offset);
  }

  if (limit) {
    orders = orders.slice(0, limit);
  }

  return new Promise((resolve) =>
    resolve({
      items: orders,
      total: ORDERS.length,
    })
  );
}

export function deleteOrder(id: string): Promise<WithID<Order>> {
  return new Promise((resolve, reject) => {
    const order = ORDERS.find((order) => order.id === id);

    if (!order) {
      return reject(new Error("Order not found"));
    }

    const orderIndex = ORDERS.findIndex((order) => order.id === id);

    ORDERS.splice(orderIndex, 1);

    return resolve(order);
  });
}

export function updateOrder(
  id: string,
  status: OrderStatus
): Promise<WithID<Order>> {
  return new Promise((resolve, reject) => {
    const order = ORDERS.find((order) => order.id === id);

    if (!order) {
      return reject(new Error("Order not found"));
    }

    order.status = status;

    return resolve(order);
  });
}

/**********************
 * Helper functions
 */

function _getOrders(num: number): WithID<Order>[] {
  const orders: WithID<Order>[] = [];

  for (let i = 0; i < num; i++) {
    const order: WithID<Order> = {
      id: `${faker.number.int(100000000)}`,
      shippingAddress: getShippingAddress(),
      orderedProducts: getOrderedProducts(),
      shippingFee: 10,
      taxes: 10,
      paymentInfo: getPaymentInfo(),
      status: getRandomStatus(),
      createdAt: getRandomDate(),
    };

    if (i === 0) {
      order.status = "processing";
      order.createdAt = new Date();
      order.orderedProducts = [
        {
          id: "product-1",

          category: {
            id: "cat-1",
            name: "Category 1",
            description: "Category 1 description",
            link: "/category/category-1",
            image: {
              src: "https://picsum.photos/seed/1/300/300",
              alt: "Category 1",
            },
            createdAt: new Date(),
            modifiedAt: new Date(),
          },
          link: "/products/1",
          name: "Product 1",
          price: 200,
          intro: "Product 1 intro",
          description: "Product 1 description",
          mainImageID: "img-1",
          images: [
            {
              id: "img-1",
              src: "https://picsum.photos/seed/1/300/300",
              alt: "Product 1",
            },
          ],
          promotion: undefined,
          variants: undefined,
          createdAt: new Date(),
          modifiedAt: new Date(),
          quantity: 2,
          selectedVariant: {
            id: "variant-1",
            name: "Variant selected",
            price: 20.3,
            image: {
              src: "https://picsum.photos/seed/1/300/300",
              alt: "Variant 1",
            },
            shown: true,
            promotion: undefined,
          },
        },
      ];
    }

    orders.push(order);
  }

  return orders;
}

function getShippingAddress(): ShippingAddress {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    streetAddress: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zip: faker.location.zipCode(),
    phone: faker.phone.number(),
    email: "emailmeplease@itsaverylongemailthatIcannotevenremember.com",
  };
}

function getOrderedProducts(): WithID<OrderedProduct>[] {
  const _products = _getProducts(Math.floor(Math.random() * 10) + 1);

  const orderedProducts = _products.map((product) => {
    const orderedProduct: WithID<OrderedProduct> = {
      ...product,
      quantity: Math.floor(Math.random() * 10) + 1,
    };

    if (product.variants) {
      const index = Math.floor(Math.random() * product.variants.length);

      orderedProduct.selectedVariant = product.variants[index];
    }

    return orderedProduct;
  });

  return orderedProducts;
}

function getPaymentInfo(): PaymentInfo {
  return {
    cardType: getRandomCardType(),
    lastFourDigits: getRandomLastFourDigits(),
    expireDate: faker.date.future(),
  };
}

function getRandomCardType(): "Visa" | "MasterCard" | "American Express" {
  const types: ("Visa" | "MasterCard" | "American Express")[] = [
    "Visa",
    "MasterCard",
    "American Express",
  ];

  const index = Math.floor(Math.random() * types.length);
  return types[index];
}

function getRandomLastFourDigits(): string {
  return Math.floor(Math.random() * 10000).toString();
}

function getRandomStatus(): OrderStatus {
  const statuses: OrderStatus[] = ["processing", "shipped", "delivered"];
  const index = Math.floor(Math.random() * statuses.length);
  return statuses[index];
}

function getRandomDate() {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const diff = end.getTime() - start.getTime();
  const newDiff = diff * Math.random();
  const date = new Date(start.getTime() + newDiff);
  return date;
}
