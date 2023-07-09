import {
  Order,
  OrderedProduct,
  OrderStatus,
  PaymentInfo,
  ShippingAddress,
  WithID,
} from "@/types";

export function getOrders(): Promise<WithID<Order>[]> {
  const orders: WithID<Order>[] = [];

  for (let i = 0; i < 10; i++) {
    const order: WithID<Order> = {
      id: `order-${i}`,
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

  return new Promise((resolve) => resolve(orders));
}

/**********************
 * Helper functions
 */

function getShippingAddress(): ShippingAddress {
  return {
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Main St",
    state: "CA",
    city: "San Francisco",
    zip: "94103",
    phone: "555-555-5555",
    email: "JohnDoe@example.com",
  };
}

function getOrderedProducts(): OrderedProduct[] {
  return [];
}

function getPaymentInfo(): PaymentInfo {
  return {
    cardType: "Visa",
    lastFourDigits: "1234",
    expireDate: new Date(),
  };
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
