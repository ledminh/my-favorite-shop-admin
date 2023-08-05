"use client";

import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

import { useState } from "react";

import classNames from "@/utils/classNames";
import ToggleButton from "./ToggleButton";

export default function Promotion() {
  const [enabled, setEnabled] = useState(false);

  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionType | null>(null);

  return (
    <RadioGroup
      value={selectedPromotion}
      onChange={setSelectedPromotion}
      className={classNames(
        "p-4 border-2 rounded-lg border-blue-950 hover:bg-gray-200",
        enabled && "bg-gray-200"
      )}
    >
      <RadioGroup.Label className="flex gap-2 text-base leading-6">
        <span className={classNames(enabled ? "font-bold" : "font-normal")}>
          Promotion
        </span>
        <div>
          <ToggleButton enabled={enabled} setEnabled={setEnabled} />
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
                  ? "border-blue-950 ring-2 ring-blue-950 ring-opacity-60"
                  : "border-gray-300",
                "relative flex cursor-pointer rounded-lg border p-2 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col gap-4">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        "block text-sm font-medium text-gray-900",
                        enabled ? "font-bold" : "font-normal"
                      )}
                    >
                      {promotion.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="flex items-center mt-1 text-sm text-gray-500"
                    >
                      <div className="flex mt-2 rounded-md shadow-sm">
                        {promotion.unit.position === "left" && (
                          <span className="inline-flex items-center px-2 text-white border border-r-0 border-blue-950 rounded-l-md sm:text-sm bg-blue-950">
                            {promotion.unit.text}
                          </span>
                        )}
                        <input
                          type="number"
                          placeholder="0"
                          min="0"
                          max="100"
                          step=".1"
                          disabled={!checked}
                          className={classNames(
                            "block w-full min-w-0 flex-1 rounded-none  py-1.5 px-2 text-gray-900 border placeholder:text-gray-400 sm:text-sm sm:leading-6 border-blue-950 focus:outline-none focus:border-blue-500 focus:ring-inset focus:ring-blue-500",
                            promotion.unit.position === "left" &&
                              "rounded-r-md border-l-0",
                            promotion.unit.position === "right" &&
                              "rounded-l-md border-r-0"
                          )}
                        />
                        {promotion.unit.position === "right" && (
                          <span className="inline-flex items-center pl-2 pr-3 text-white border border-l-0 border-blue-950 rounded-r-md sm:text-sm bg-blue-950">
                            {promotion.unit.text}
                          </span>
                        )}
                      </div>
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

/****************************
 * Data
 */

type PromotionType = {
  id: "discount" | "sale";
  title: string;
  unit: {
    text: "$" | "%";
    position: "left" | "right";
  };
};

const promotionList: PromotionType[] = [
  {
    id: "discount",
    title: "Discount",
    unit: {
      text: "%",
      position: "right",
    },
  },
  {
    id: "sale",
    title: "Sale",
    unit: {
      text: "$",
      position: "left",
    },
  },
];
