import NewMessages from "@/components/home/NewMessages";
import NewOrders from "@/components/home/NewOrders";
import { getOrders } from "@/data/orders";
import { CustomerMessage, WithID } from "@/types";
import { ReactNode, FC } from "react";

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
  const { items: orders } = await getOrders({
    offset: 0,
    limit: 5,
  });
  return (
    <Wrapper>
      <Section>
        <NewMessages customerMessages={customerMessages} />
      </Section>
      <Section>
        <NewOrders orders={orders} />
      </Section>
      <Section>
        <div className="flex justify-start gap-[4%]">
          <Button>ADD NEW CATEGORY</Button>
          <Button>ADD NEW PRODUCT</Button>
        </div>
      </Section>
    </Wrapper>
  );
}

/*************************
 * Styles
 */
const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-wrap justify-between gap-y-6">{children}</div>
);

const Section: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="basis-full md:basis-[49%]">{children}</div>
);

/**************************
 * Components
 */
type ButtonProps = {
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => (
  <button className="p-4 font-bold border-2 rounded-lg border-blue-950 text-blue-950 hover:bg-blue-950/10 hover:shadow-stone-800 hover:shadow-md active:bg-blue-950/20">
    {children}
  </button>
);
