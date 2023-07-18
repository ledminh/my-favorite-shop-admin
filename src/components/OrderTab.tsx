"use client";

import { Order, WithID } from "@/types";

import { useState } from "react";
import ModalLg from "@/components/layout/ModalLg";
import getOrderProductName from "@/utils/getOrderProductName";
import getOrderPrice from "@/utils/getOrderPrice";

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

/*******************************************/

type OrderModalProps = {
  item: WithID<Order>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const OrderModal = ({ item, isOpen, setIsOpen }: OrderModalProps) => {
  const changeStatusOnClick = () => {
    console.log("change status");
  };

  const additionalButtons = [
    {
      text: "DELETE",
      className: "text-red-600 bg-white hover:bg-red-100",
      onClick: () => deleteOrder(item.id, (res) => console.log(res)),
    },
  ];

  return (
    <ModalLg
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
          value={item.orderedProducts.map((product) => product.name).join(", ")}
          small={true}
        />
        <InfoTab
          label="Status"
          value={item.status}
          Button={
            <button
              className="self-center col-span-1 text-sm font-semibold text-blue-900 hover:underline justify-self-start"
              onClick={() => {}}
            >
              CHANGE
            </button>
          }
        />
      </div>
    </ModalLg>
  );
};

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

/****************************
 * Utils
 */
function deleteOrder(id: string, callback: (res: any) => void) {
  fetch(`/api/orders/${id}`, {
    method: "DELETE",
  })
    .then(callback)
    .catch((err) => console.error(err));
}
