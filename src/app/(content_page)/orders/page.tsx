import { getOrders } from "@/data/orders";
import OrderList from "@/components/orders/OrderList";
import ControlPanel from "@/components/orders/ControlPanel";

import { itemsPerPage } from "@/config";

export default async function OrdersPage() {
  const { items: initOrders, total } = await getOrders({
    offset: 0,
    limit: itemsPerPage,
    sortedOrder: "newest",
  });

  return (
    <div className="m-4">
      <ControlPanel />
      <OrderList initOrders={initOrders} total={total} />
    </div>
  );
}
