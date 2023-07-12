import NewMessages from "@/components/home/NewMessages";
import NewOrders from "@/components/home/NewOrders";
import { getCustomerMessages } from "@/data/customerMessages";
import { getOrders } from "@/data/orders";
import { ReactNode, FC } from "react";

export default async function Home() {
  const getOrdersPromise = getOrders({
    offset: 0,
    limit: 5,
  });

  const getMessagesPromise = getCustomerMessages();

  const [{ items: orders }, { items: customerMessages }] = await Promise.all([
    getOrdersPromise,
    getMessagesPromise,
  ]);

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
