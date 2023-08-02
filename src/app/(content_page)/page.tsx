import NewCatButton from "@/components/home/NewCatButton";
import NewMessages from "@/components/home/NewMessages";
import NewOrders from "@/components/home/NewOrders";
import NewProdButton from "@/components/home/NewProdButton";
import { getCustomerMessages } from "@/data/customerMessages";
import { getOrders } from "@/data/orders";
import { getCategories } from "@/data/categories";
import { ReactNode, FC } from "react";

export default async function Home() {
  const getOrdersPromise = getOrders({
    offset: 0,
    limit: 7,
    filter: "processing",
    sortBy: "createdAt",
    sortedOrder: "asc",
  });

  const getMessagesPromise = getCustomerMessages({
    offset: 0,
    limit: 7,
    filter: "unread",
    sortedBy: "createdAt",
    sortedOrder: "desc",
  });

  const getCategoriesPromise = getCategories({ sortBy: "name", order: "asc" });

  const [
    { items: orders },
    { items: customerMessages },
    { items: categories },
  ] = await Promise.all([
    getOrdersPromise,
    getMessagesPromise,
    getCategoriesPromise,
  ]);

  return (
    <Wrapper>
      <Section>
        <NewMessages initMessages={customerMessages} />
      </Section>
      <Section>
        <NewOrders initOrders={orders} />
      </Section>
      <Section>
        <div className="flex justify-start gap-[4%]">
          <NewCatButton />
          <NewProdButton categories={categories} />
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
  <div className="basis-full lg:basis-[49%]">{children}</div>
);
