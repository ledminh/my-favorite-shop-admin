"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { OrderStatus } from "@/types";

type Props = {
  currentStatus: OrderStatus;
  setStatus: (status: OrderStatus) => void;
};

export default function ChangeButton({ currentStatus, setStatus }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Header />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 bg-white rounded-md shadow-lg w-28 bottom-8 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {OrderStatuses.filter(
              (option) => option.value !== currentStatus
            ).map((option) => (
              <Menu.Item key={option.text}>
                {({ active }) => (
                  <button
                    onClick={() => setStatus(option.value)}
                    className={classNames(
                      active ? "bg-gray-400 text-gray-950" : "text-gray-700",
                      "block px-4 py-2 text-sm w-full text-left"
                    )}
                  >
                    {option.text}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

/**************************
 * Components
 */

const Header = () => (
  <div>
    <Menu.Button className="self-center col-span-1 text-sm font-semibold text-blue-900 hover:underline justify-self-start">
      CHANGE
    </Menu.Button>
  </div>
);

/**************************
 * Utility
 */

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/*************************
 * Data
 */
const OrderStatuses: {
  text: string;
  value: OrderStatus;
}[] = [
  { text: "Processing", value: "processing" },
  { text: "Shipped", value: "shipped" },
  { text: "Delivered", value: "delivered" },
];
