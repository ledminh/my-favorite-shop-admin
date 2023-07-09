import NewMessages from "@/components/home/NewMessages";
import NewOrders from "@/components/home/NewOrders";
import { getOrders } from "@/data/orders";
import { CustomerMessage, WithID } from "@/types";

const customerMessages: WithID<CustomerMessage>[] = [
  {
    id: "cm-1",
    firstName: "John",
    lastName: "Doe",
    email: "jd@jd.com",
    phone: "123456789",
    message:
      "Hello, I have a question about your product. I would like to know if it is possible to order it in a different color and if so, how long would it take to deliver it to me. Thank you for your answer. Best regards, John Doe",
    status: "unread",
    createdAt: new Date(),
  },
  {
    id: "cm-2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jj@jj.com",
    phone: "987654321",
    message:
      "Hello, I have another question about your product. I would like to know if it is possible to order it in a different color and if so, how long would it take to deliver it to me. Thank you for your answer. Best regards, Jane Doe",
    status: "unread",
    createdAt: new Date(),
  },
  {
    id: "cm-3",
    firstName: "Jack",
    lastName: "Doe",
    email: "jackdoe@jackdoe.com",
    phone: "123456789",
    message:
      "Hello, I have a question about your product. I would like to know if it is possible to order it in a different color and if so, how long would it take to deliver it to me. Thank you for your answer. Best regards, Jack Doe",
    status: "unread",
    createdAt: new Date(),
  },
  {
    id: "cm-4",
    firstName: "Jill",
    lastName: "Doe",
    email: "jilldoe@jilldoe.com",
    phone: "987654321",
    message:
      "Hello, I have another question about your product. I would like to know if it is possible to order it in a different color and if so, how long would it take to deliver it to me. Thank you for your answer. Best regards, Jill Doe",
    status: "unread",
    createdAt: new Date(),
  },
];

export default async function Home() {
  const orders = await getOrders();
  return (
    <>
      <NewMessages customerMessages={customerMessages} />
      <NewOrders orders={orders} />
      <Button>ADD NEW CATEGORY</Button>
      <Button>ADD NEW PRODUCT</Button>
    </>
  );
}

/*************************
 * Styles
 */

type ButtonProps = {
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => (
  <button className="p-4 font-bold border-2 rounded-lg border-blue-950 text-blue-950 hover:bg-blue-950/20 hover:ring-2 hover:ring-blue-950">
    {children}
  </button>
);
