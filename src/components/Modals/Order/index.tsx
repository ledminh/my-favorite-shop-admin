"use client";

import { useState } from "react";
import Modal from "@/components/layout/Modal";

import { Order, OrderStatus, WithID } from "@/types";

import ChangeButton from "./ChangeButton";
import getOrderProductName from "@/utils/getOrderProductName";
import updateOrder from "@/api-calls/updateOrder";
import deleteOrder from "@/api-calls/deleteOrder";

type Props = {
  initItem: WithID<Order>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterDelete: (o: WithID<Order>) => void;
  afterUpdate: (o: WithID<Order>) => void;
};

const OrderModal = ({
  initItem,
  isOpen,
  setIsOpen,
  afterDelete,
  afterUpdate,
}: Props) => {
  const [item, setItem] = useState(initItem);

  const additionalButtons = [
    {
      text: "DELETE",
      className: "text-red-600 bg-white hover:bg-red-100",
      onClick: () =>
        deleteOrder(item.id).then(() => {
          afterDelete(item);
        }),
    },
  ];

  const updateStatus = (status: OrderStatus) => {
    updateOrder(item.id, status).then((updatedOrder) => {
      afterUpdate(updatedOrder);
      setItem(updatedOrder);
    });
  };

  return (
    <Modal
      title="ORDER DETAILS"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      additionalButtons={additionalButtons}
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
          value={item.orderedProducts.map(getOrderProductName).join(", ")}
          small={true}
        />
        <InfoTab
          label="Status"
          value={item.status}
          Button={
            <ChangeButton
              currentStatus={item.status}
              updateStatus={updateStatus}
            />
          }
        />
      </div>
    </Modal>
  );
};

export default OrderModal;

/*****************************
 * Components
 */

const InfoTab = ({
  label,
  value,
  small,
  Button,
}: {
  label: string;
  value: string;
  small?: boolean;
  Button?: JSX.Element;
}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="col-span-1 font-semibold">{label}</span>
      <span
        className={`${Button ? "col-span-1" : "col-span-2"} break-words${
          small ? " text-sm" : ""
        }`}
      >
        {value}
      </span>
      {Button}
    </div>
  );
};
