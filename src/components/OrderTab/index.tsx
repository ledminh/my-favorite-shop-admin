"use client";

import { Order, WithID } from "@/types";

import { useState } from "react";
import getOrderProductName from "@/utils/getOrderProductName";
import getOrderPrice from "@/utils/getOrderPrice";
import OrderModal from "@/components/Modals/Order";

type OrderTabProps = {
  item: WithID<Order>;
};

const OrderTab = ({ item }: OrderTabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button item={item} onClick={() => setIsOpen(true)} />
      <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} item={item} />
    </>
  );
};

export default OrderTab;

/************************
 * Components
 */

type ButtonProps = {
  item: WithID<Order>;
  onClick: () => void;
};

const Button = ({ item, onClick }: ButtonProps) => {
  const { shippingAddress, orderedProducts, createdAt, id, status } = item;

  const { firstName, lastName } = shippingAddress;

  let productNames = orderedProducts.map(getOrderProductName).join(", ");

  if (productNames.length > 100)
    productNames = productNames.slice(0, 100).concat(" ...");

  const price = getOrderPrice(item);

  const Status =
    status === "processing" ? (
      <span className="px-1 italic text-white bg-blue-950">{status}</span>
    ) : status === "shipped" ? (
      <span className="px-1 italic text-white bg-neutral-700">{status}</span>
    ) : (
      <span className="px-1 italic text-white bg-red-950">{status}</span> // status === "delivered"
    );

  return (
    <button
      className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900 active:bg-orange-200"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="flex justify-start gap-2 text-sm font-semibold">
          <span>Order #: </span>
          <span>{id}</span>
          {Status}
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
