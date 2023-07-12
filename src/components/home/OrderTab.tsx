import { Order, WithID } from "@/types";

type OrderTabProps = {
  item: WithID<Order>;
};

const OrderTab = ({ item }: OrderTabProps) => {
  const { shippingAddress, orderedProducts, createdAt, id } = item;

  const { firstName, lastName } = shippingAddress;

  return (
    <button className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900 active:bg-orange-200">
      <div className="flex justify-start gap-2 text-sm font-semibold">
        <span>Order #: </span>
        <span>{id}</span>
      </div>
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

export default OrderTab;
