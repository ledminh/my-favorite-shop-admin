"use client";

import { Fragment, FC } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigator() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Menu
          <ChevronDownIcon
            className="w-5 h-5 -mr-1 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {NavItems.map((item) => (
              <MenuItem key={item.name} name={item.name} href={item.href} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

/****************************
 * Components
 */
const MenuItem: FC<{ name: string; href: string }> = ({ name, href }) => (
  <Menu.Item>
    {({ active }) => (
      <a
        href={href}
        className={classNames(
          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
          "block px-4 py-2 text-sm"
        )}
      >
        {name}
      </a>
    )}
  </Menu.Item>
);

/****************************
 * Data
 */

const NavItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Categories",
    href: "/categories",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Customer Messages",
    href: "/messages",
  },
];
