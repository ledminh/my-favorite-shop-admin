"use client";

import { Order, WithID } from "@/types";

import { useState } from "react";
import ModalLg from "@/components/layout/ModalLg";

type OrderTabProps = {
  item: WithID<Order>;
};

const OrderTab = ({ item }: OrderTabProps) => {
  const [isOpen, setIsOpen] = useState(true);
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
        <div className="flex gap-4 pb-2 border-b border-blue-950">
          <h3 className="text-xl">
            <span className="font-semibold">Order #:</span>
          </h3>
          <h3 className="text-xl">
            <span>{item.id}</span>
          </h3>
        </div>
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
          small={true}
        />
        <InfoTab
          label="Status"
          value={item.status}
          button={{ label: "CHANGE", onClick: () => {} }}
        />
      </div>
    </ModalLg>
  );
};

const InfoTab = ({
  label,
  value,
  small,
  button,
}: {
  label: string;
  value: string;
  small?: boolean;
  button?: { label: string; onClick: () => void };
}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="col-span-1 font-semibold">{label}</span>
      <span
        className={`${button ? "col-span-1" : "col-span-2"} break-words${
          small ? " text-sm" : ""
        }`}
      >
        {value}
      </span>
      {button && (
        <button
          className="self-center col-span-1 text-sm font-semibold text-blue-900 hover:underline justify-self-start"
          onClick={button.onClick}
        >
          {button.label}
        </button>
      )}
    </div>
  );
};
