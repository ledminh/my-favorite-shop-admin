import { CustomerMessage, CustomerMessageStatus, WithID } from "@/types";
import { faker } from "@faker-js/faker";

const CUSTOMER_MESSAGES = _getCustomerMessages(50);

type getCustomerMessagesProps = {
  offset: number;
  limit: number;
  status?: CustomerMessageStatus;
  sortedBy: "firstName" | "lastName" | "createdAt" | "email";
  sortedOrder: "asc" | "desc";
};

export function getCustomerMessages({
  offset,
  limit,
  status,
  sortedBy,
  sortedOrder,
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

  if (status) {
    customerMessages = customerMessages.filter(
      (customerMessage) => customerMessage.status === status
    );
  }

  if (sortedBy === "firstName") {
    customerMessages = customerMessages.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
  } else if (sortedBy === "lastName") {
    customerMessages = customerMessages.sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );
  } else if (sortedBy === "createdAt") {
    customerMessages = customerMessages.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  } else if (sortedBy === "email") {
    customerMessages = customerMessages.sort((a, b) =>
      a.email.localeCompare(b.email)
    );
  }

  if (sortedOrder === "asc") {
    customerMessages = customerMessages.reverse();
  }

  if (offset) {
    customerMessages = customerMessages.slice(offset);
  }

  if (limit) {
    customerMessages = customerMessages.slice(0, limit);
  }

  return new Promise((resolve) => {
    resolve({ items: customerMessages, total: customerMessages.length });
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

  return customerMessages;
}

function getRandomStatus() {
  const statuses: CustomerMessageStatus[] = ["unread", "read"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}
