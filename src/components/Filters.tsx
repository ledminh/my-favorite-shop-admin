"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";

import classNames from "@/utils/classNames";

type Props<T> = {
  filterOptions: {
    id: T;
    text: string;
  }[];
  onChange: (filter: T | null) => void;
};

export default function Filters<T>({ filterOptions, onChange }: Props<T>) {
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
        <Menu.Items className="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item key="none">
              {({ active }) => (
                <button
                  onClick={() => onChange(null)}
                  className={classNames(
                    active ? "bg-gray-400 text-gray-950" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full text-left"
                  )}
                >
                  None
                </button>
              )}
            </Menu.Item>
            {filterOptions.map((option) => (
              <Menu.Item key={option.text}>
                {({ active }) => (
                  <button
                    onClick={() => onChange(option.id)}
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
    <Menu.Button className="flex items-center justify-between gap-2 p-2 text-gray-600 bg-gray-100 rounded-md ring-1 ring-gray-600 hover:text-gray-900 focus:outline-none focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100">
      <span className="sr-only">Open Filters</span>
      <FunnelIcon className="w-6 h-6" aria-hidden="true" />
    </Menu.Button>
  </div>
);
