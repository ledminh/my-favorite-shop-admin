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
      total: orders.length,
    })
  );
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
    email: faker.internet.email(),
  };
}

function getOrderedProducts(): OrderedProduct[] {
  const _products = _getProducts(Math.floor(Math.random() * 10) + 1);

  const orderedProducts = _products.map((product) => {
    const orderedProduct: OrderedProduct = {
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
