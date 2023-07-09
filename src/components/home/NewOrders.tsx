import { Order } from "@/types";
import Card from "./Card";

type Props = {
  orders: Order[];
};

export default function NewOrders({ orders }: Props) {
  return (
    <Card
      title="NEW ORDERS"
      button={{ link: "/orders", text: "SEE ALL ORDERS" }}
      items={orders}
      ItemTab={OrderTab}
    />
  );
}

/***************************
 * Components
 */

type OrderTabProps = {
  item: Order;
};

const OrderTab = ({ item }: OrderTabProps) => {
  const { shippingAddress, orderedProducts, createdAt } = item;

  const { firstName, lastName } = shippingAddress;

  return (
    <button className="flex flex-col gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900">
      <div className="flex justify-between text-sm">
        <h3 className="font-bold">
          {firstName} {lastName}
        </h3>
        <span className="italic font-semibold">
          {createdAt.toLocaleDateString()}
        </span>
      </div>
      <div className="text-xs text-left">
        {orderedProducts.slice(0, 100).map((product) => product.name)} ...
      </div>
    </button>
  );
};
