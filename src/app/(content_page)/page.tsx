import NewCatButton from "@/components/home/NewCatButton";
import NewMessages from "@/components/home/NewMessages";
import NewOrders from "@/components/home/NewOrders";
import NewProdButton from "@/components/home/NewProdButton";
import { getCustomerMessages } from "@/data/customerMessages";
import { getOrders } from "@/data/orders";
import { ReactNode, FC } from "react";

export default async function Home() {
  const getOrdersPromise = getOrders({
    offset: 0,
    limit: 7,
    status: "processing",
    sortedOrder: "newest",
  });

  const getMessagesPromise = getCustomerMessages({
    offset: 0,
    limit: 7,
    status: "unread",
    sortedBy: "createdAt",
    sortedOrder: "asc",
  });

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
          <NewCatButton />
          <NewProdButton />
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
