"use client";

import { Fragment, FC } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  navItems: { name: string; href: string }[];
};

export default function DropdownMenu({ navItems }: Props) {
  return (
    <Menu as="div" className="relative inline-block w-32 text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          MENU
          <ChevronDownIcon
            className="w-6 h-6 -mr-1 text-gray-400"
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
            {navItems.map((item) => (
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
      <Link
        href={href}
        className={classNames(
          active ? "bg-blue-400 text-gray-900" : "text-gray-700",
          "block px-4 py-2 text-sm"
        )}
      >
        {name}
      </Link>
    )}
  </Menu.Item>
);

/***************************
 * Utils
 */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
