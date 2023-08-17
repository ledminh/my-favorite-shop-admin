"use client";

import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

import classNames from "@/utils/classNames";
import ToggleButton from "./ToggleButton";
import usePromotion from "./hook";
import { _PromotionType, Props } from "./types";

export default function Promotion(props: Props) {
  const {
    selectedPromotion,
    setSelectedPromotion,
    enabled,
    setEnabled,
    promotionList,
    discountPercentStr,
    salePriceStr,
    setNumValue,
    saleDescription,
    discountDescription,
    setDescription,
  } = usePromotion(props);

  return (
    <RadioGroup
      value={selectedPromotion}
      onChange={setSelectedPromotion}
      className={classNames(
        "p-4 border-2 rounded-lg border-blue-950 hover:border-blue-950",
        enabled ? "bg-gray-400" : "bg-gray-100"
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
            disabled={!enabled}
            className={({ active }) =>
              classNames(
                active
                  ? "border-blue-950 ring-2 ring-blue-950 ring-opacity-60 shadow-md shadow-black"
                  : "border-gray-30",
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
                        "block text-sm font-medium",
                        enabled
                          ? "font-bold text-blue-950"
                          : "font-normal text-gray-900"
                      )}
                    >
                      {promotion.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="flex flex-col items-center mt-1 text-sm text-gray-500"
                    >
                      <div className="flex mt-2 rounded-md shadow-sm">
                        {promotion.unit.position === "left" && (
                          <Unit position="left" text={promotion.unit.text} />
                        )}
                        <ValueInput
                          checked={checked}
                          numValue={
                            promotion.id === "discount"
                              ? discountPercentStr
                              : salePriceStr
                          }
                          setNumValue={setNumValue}
                          promotion={promotion}
                        />
                        {promotion.unit.position === "right" && (
                          <Unit position="right" text={promotion.unit.text} />
                        )}
                      </div>
                      <div className="mt-2">
                        <DescriptionInput
                          checked={checked}
                          description={
                            promotion.id === "discount"
                              ? discountDescription
                              : saleDescription
                          }
                          setDescription={setDescription}
                          promotionID={promotion.id}
                        />
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

/*****************************
 * Components
 */
const ValueInput = (props: {
  checked: boolean;
  numValue: string;
  setNumValue: (value: string, id: string) => void;
  promotion: _PromotionType;
}) => (
  <input
    placeholder="0"
    disabled={!props.checked}
    value={props.numValue}
    onChange={(e) => props.setNumValue(e.target.value, props.promotion.id)}
    className={classNames(
      "block w-full min-w-0 flex-1 rounded-none  py-1.5 px-2 text-gray-900 border placeholder:text-gray-400 sm:text-sm sm:leading-6 border-blue-950 focus:outline-none focus:border-blue-500 focus:ring-inset focus:ring-blue-500",
      props.promotion.unit.position === "left" && "rounded-r-md border-l-0",
      props.promotion.unit.position === "right" && "rounded-l-md border-r-0"
    )}
  />
);

const Unit = (props: { position: "left" | "right"; text: string }) => {
  if (props.position === "left") {
    return (
      <span className="inline-flex items-center px-2 text-white border border-r-0 border-blue-950 rounded-l-md sm:text-sm bg-blue-950">
        {props.text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 text-white border border-l-0 border-blue-950 rounded-r-md sm:text-sm bg-blue-950">
      {props.text}
    </span>
  );
};

const DescriptionInput = (props: {
  checked: boolean;
  description: string;
  setDescription: (value: string, promotionID: string) => void;
  promotionID: string;
}) => (
  <input
    type="text"
    placeholder="Description"
    disabled={!props.checked}
    value={props.description}
    onChange={(e) => props.setDescription(e.target.value, props.promotionID)}
    className={classNames(
      "block w-full min-w-0 flex-1 rounded-md py-1.5 px-2 text-gray-900 border placeholder:text-gray-400 sm:text-sm sm:leading-6 border-blue-950 focus:outline-none focus:border-blue-500 focus:ring-inset focus:ring-blue-500"
    )}
  />
);
