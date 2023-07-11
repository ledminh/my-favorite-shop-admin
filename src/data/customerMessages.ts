import { CustomerMessage, CustomerMessageStatus, WithID } from "@/types";
import { faker } from "@faker-js/faker";

const customerMessages = _getCustomerMessages(50);

export function getCustomerMessages(): Promise<{
  items: WithID<CustomerMessage>[];
  total: number;
}> {
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
