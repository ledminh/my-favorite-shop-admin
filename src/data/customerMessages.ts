import { CustomerMessage, CustomerMessageStatus, WithID } from "@/types";
import { faker } from "@faker-js/faker";

const CUSTOMER_MESSAGES = _getCustomerMessages(50);

type getCustomerMessagesProps = {
  offset: number;
  limit: number;
  sortedBy: "customer" | "email" | "createdAt";
  sortedOrder: "asc" | "desc";
  searchTerm?: string;
  filter: CustomerMessageStatus | null;
};

export function getCustomerMessages({
  offset,
  limit,
  sortedBy,
  sortedOrder,
  searchTerm,
  filter,
}: getCustomerMessagesProps): Promise<{
  items: WithID<CustomerMessage>[];
  total: number;
}> {
  if (limit === 0) {
    return new Promise((resolve) =>
      resolve({
        items: [],
        total: CUSTOMER_MESSAGES.length,
      })
    );
  }

  let customerMessages = CUSTOMER_MESSAGES;

  if (searchTerm) {
    customerMessages = customerMessages.filter((customerMessage) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      const firstName = customerMessage.firstName.toLowerCase();
      const lastName = customerMessage.lastName.toLowerCase();
      const email = customerMessage.email.toLowerCase();
      const phone = customerMessage.phone?.toLowerCase();
      const message = customerMessage.message.toLowerCase();

      return (
        firstName.includes(searchTermLowerCase) ||
        lastName.includes(searchTermLowerCase) ||
        email.includes(searchTermLowerCase) ||
        phone?.includes(searchTermLowerCase) ||
        message.includes(searchTermLowerCase)
      );
    });
  }

  if (filter) {
    customerMessages = customerMessages.filter(
      (customerMessage) => customerMessage.status === filter
    );
  }

  if (sortedBy === "customer") {
    customerMessages = customerMessages.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

      return nameA.localeCompare(nameB);
    });
  }

  if (sortedBy === "email") {
    customerMessages = customerMessages.sort((a, b) => {
      const emailA = a.email.toLowerCase();
      const emailB = b.email.toLowerCase();

      return emailA.localeCompare(emailB);
    });
  }

  if (sortedBy === "createdAt") {
    customerMessages = customerMessages.sort((a, b) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  if (sortedOrder === "desc") {
    customerMessages = customerMessages.reverse();
  }

  const total = customerMessages.length;

  if (offset) {
    customerMessages = customerMessages.slice(offset);
  }

  if (limit) {
    customerMessages = customerMessages.slice(0, limit);
  }

  return new Promise((resolve) => {
    resolve({ items: customerMessages, total });
  });
}

export function updateMessage(
  id: string,
  status: CustomerMessageStatus
): Promise<WithID<CustomerMessage>> {
  return new Promise((resolve, reject) => {
    console.log(id, status);

    const customerMessage = CUSTOMER_MESSAGES.find(
      (customerMessage) => customerMessage.id === id
    );

    if (!customerMessage) {
      return reject(new Error("Customer Message not found"));
    }

    customerMessage.status = status;

    return resolve(customerMessage);
  });
}

export function deleteMessage(id: string): Promise<WithID<CustomerMessage>> {
  return new Promise((resolve, reject) => {
    const customerMessage = CUSTOMER_MESSAGES.find(
      (customerMessage) => customerMessage.id === id
    );

    if (!customerMessage) {
      return reject(new Error("Customer Message not found"));
    }

    const customerMessageIndex = CUSTOMER_MESSAGES.findIndex(
      (customerMessage) => customerMessage.id === id
    );

    CUSTOMER_MESSAGES.splice(customerMessageIndex, 1);

    return resolve(customerMessage);
  });
}

/***************************
 * Helpers
 */

function _getCustomerMessages(num: number): WithID<CustomerMessage>[] {
  const customerMessages: WithID<CustomerMessage>[] = [];

  for (let i = 0; i < num; i++) {
    customerMessages.push({
      id: `cm-${faker.string.uuid()}`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      message: faker.lorem.paragraph(),
      status: getRandomStatus(),
      createdAt: faker.date.past(),
    });
  }

  customerMessages[0].id = "cm-1";
  customerMessages[0].createdAt = new Date();

  return customerMessages;
}

function getRandomStatus() {
  const statuses: CustomerMessageStatus[] = ["unread", "read"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}
