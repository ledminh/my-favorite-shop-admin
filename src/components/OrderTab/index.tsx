"use client";

import { Order, WithID } from "@/types";

import getOrderProductName from "@/utils/getOrderProductName";
import getOrderPrice from "@/utils/getOrderPrice";

type OrderTabProps = {
  item: WithID<Order>;
  setIsModalOpen: (isOpen: boolean) => void;
  setCurrentItem: (item: WithID<Order>) => void;
};

const OrderTab = ({ item, setIsModalOpen, setCurrentItem }: OrderTabProps) => {
  const { shippingAddress, orderedProducts, createdAt, id, status } = item;

  const { firstName, lastName } = shippingAddress;

  let productNames = orderedProducts.map(getOrderProductName).join(", ");

  if (productNames.length > 100)
    productNames = productNames.slice(0, 100).concat(" ...");

  const price = getOrderPrice(item);

  const Status =
    status === "processing" ? (
      <>
        <span className="hidden px-1 italic text-white sm:block bg-blue-950">
          {status}
        </span>
        <span className="flex items-center justify-center w-6 h-6 italic text-white rounded-full sm:hidden bg-blue-950">
          P
        </span>
      </>
    ) : status === "shipped" ? (
      <>
        <span className="hidden px-1 italic text-white sm:block bg-neutral-700">
          {status}
        </span>
        <span className="flex items-center justify-center w-6 h-6 italic text-white rounded-full bg-neutral-700 sm:hidden">
          S
        </span>
      </>
    ) : (
      <>
        <span className="hidden px-1 italic text-white sm:block bg-red-950">
          {status}
        </span>
        <span className="flex items-center justify-center w-6 h-6 italic text-white rounded-full bg-red-950 sm:hidden">
          D
        </span>
      </>
      // status === "delivered"
    );

  const onClick = () => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  return (
    <button
      className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900 active:bg-orange-200"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="flex justify-start gap-2 text-sm font-semibold">
          <span>Order #: </span>
          <span>{id}</span>
          <span className="font-mono">{Status}</span>
        </div>
        <div className="flex justify-end gap-2 text-sm font-semibold">
          <span className="text-red-800">${price.toFixed(2)}</span>
        </div>
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
        <span className="font-semibold">Products: </span>
        <span>{productNames}</span>
      </div>
    </button>
  );
};

export default OrderTab;
