"use client";

import { Order, WithID } from "@/types";

import { useState } from "react";
import ModalLg from "@/components/layout/ModalLg";

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
  const { shippingAddress, orderedProducts, createdAt, id } = item;

  const { firstName, lastName } = shippingAddress;

  return (
    <button
      className="flex flex-col w-full gap-2 p-2 rounded-lg hover:ring hover:ring-blue-900 active:bg-orange-200"
      onClick={onClick}
    >
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

/*******************************************/

type OrderModalProps = {
  item: WithID<Order>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const OrderModal = ({ item, isOpen, setIsOpen }: OrderModalProps) => {
  const onDelete = () => {
    console.log("Delete");
  };

  return (
    <ModalLg
      title="ORDER DETAILS"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onDelete={onDelete}
    >
      <div className="flex flex-col gap-4">
        <InfoTab label="Order #" value={item.id} />
        <InfoTab label="Date" value={item.createdAt.toLocaleDateString()} />
        <InfoTab label="Time" value={item.createdAt.toLocaleTimeString()} />
        <InfoTab
          label="Customer"
          value={`${item.shippingAddress.firstName} ${item.shippingAddress.lastName}`}
        />
        <InfoTab label="Email" value={item.shippingAddress.email} />
        <InfoTab label="Phone" value={item.shippingAddress.phone} />
        <InfoTab label="Address" value={item.shippingAddress.streetAddress} />
        <InfoTab label="City" value={item.shippingAddress.city} />
        <InfoTab label="State" value={item.shippingAddress.state} />
        <InfoTab label="Zip" value={item.shippingAddress.zip} />
        <InfoTab
          label="Products"
          value={item.orderedProducts.map((product) => product.name).join(", ")}
        />
      </div>
    </ModalLg>
  );
};

const InfoTab = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-start gap-8">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
};
