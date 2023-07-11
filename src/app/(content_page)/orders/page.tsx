import { getOrders } from "@/data/orders";
import OrderList from "@/components/orders/OrderList";

import { itemsPerPage } from "@/config";

export default async function OrdersPage() {
  const { items: initOrders, total } = await getOrders({
    offset: 0,
    limit: itemsPerPage,
  });

  return (
    <>
      <OrderList initOrders={initOrders} total={total} />
    </>
  );
}
