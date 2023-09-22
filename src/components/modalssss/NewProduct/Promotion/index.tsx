"use client";

import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

import { useState } from "react";

import ToggleButton from "./ToggleButton";

export default function Promotion() {
  const [selectedPromotion, setSelectedPromotion] = useState(promotionList[0]);
  return (
    <RadioGroup value={selectedPromotion} onChange={setSelectedPromotion}>
      <RadioGroup.Label className="flex gap-2 text-base leading-6 text-gray-900">
        <span>Promotion</span>
        <div>
          <ToggleButton />
        </div>
      </RadioGroup.Label>

      <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {promotionList.map((promotion) => (
          <RadioGroup.Option
            key={promotion.id}
            value={promotion}
            className={({ active }) =>
              classNames(
                active
                  ? "border-blue-950 ring-2 ring-blue-950"
                  : "border-gray-300",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col gap-4">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {promotion.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="flex items-center mt-1 text-sm text-gray-500"
                    >
                      <input
                        className="border border-gray-300 rounded-md"
                        type="number"
                        placeholder="0"
                        min="0"
                        max="100"
                        step="1"
                      />
                    </RadioGroup.Description>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-blue-950"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-blue-950" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

/******************************
 * Utils
 */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/****************************
 * Data
 */

const promotionList = [
  {
    id: "discount",
    title: "Discount",
    description: "Last message sent an hour ago",
    users: "621 users",
  },
  {
    id: "sale",
    title: "Sale",
    description: "Last message sent 2 weeks ago",
    users: "1200 users",
  },
];
