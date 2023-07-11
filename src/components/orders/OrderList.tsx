import { WithID, Order } from "@/types";

type OrderListProps = {
  initOrders: WithID<Order>[];
  total: number;
};
export default function OrderList({ initOrders, total }: OrderListProps) {
  return (
    <div>
      {initOrders.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>
        </div>
      ))}
    </div>
  );
}
