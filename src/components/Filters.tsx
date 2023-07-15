"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";

import { useState } from "react";

export default function Filters() {
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Header text={filter === null ? "Filter" : filter} />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item key="none">
              {({ active }) => (
                <button
                  onClick={() => setFilter(null)}
                  className={classNames(
                    active ? "bg-gray-400 text-gray-950" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full text-left"
                  )}
                >
                  None
                </button>
              )}
            </Menu.Item>
            {FilterOptions.map((option) => (
              <Menu.Item key={option.text}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setFilter(
                        FilterOptions.find((o) => o.text === option.text)
                          ?.text || null
                      );
                    }}
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

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => (
  <div>
    <Menu.Button className="flex items-center justify-between gap-2 p-2 text-gray-600 bg-gray-100 rounded-md ring-1 ring-gray-600 hover:text-gray-900 focus:outline-none focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100">
      <span className="sr-only">Open Filters</span>
      <FunnelIcon className="w-6 h-6" aria-hidden="true" />
      <span className="text-sm font-medium break">{text}</span>
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
const FilterOptions = [
  {
    id: "with-variants",
    text: "With Variants",
  },
  {
    id: "with-promotion",
    text: "With Promotion",
  },
];
