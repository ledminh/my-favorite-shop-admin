import { Order, WithID } from "@/types";
import Card from "./Card";

import OrderTab from "@/components/OrderTab";
import OrderModal from "@/components/modals/Order";

type Props = {
  orders: WithID<Order>[];
};

export default function NewOrders({ orders }: Props) {
  return (
    <Card
      title="NEW ORDERS"
      button={{ link: "/orders", text: "SEE ALL ORDERS" }}
      items={orders}
      ItemTab={OrderTab}
      ItemModal={OrderModal}
    />
  );
}
