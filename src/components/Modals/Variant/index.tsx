"use client";

import classNames from "@/utils/classNames";
import { Switch } from "@headlessui/react";

import Image from "next/image";
import Modal from "@/components/layout/Modal";

import useVariantModal from "./hooks";

import isImageType from "@/utils/isImageType";

import { Props } from "./types";
import Promotion from "@/components/Promotion";

export default function VariantModal(props: Props) {
  const {
    shown,
    setShown,
    onClose,
    additionalButtons,
    name,
    onNameChange,
    priceStr,
    onPriceChange,
    onPromotionChange,
    image,
    onImageChange,
  } = useVariantModal(props);

  const { isOpen, setIsOpen, title, initPromotion, disabled } = props;

  return (
    <Modal
      type={props.type === "delete" ? "attention" : "normal"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      onClose={onClose}
      additionalButtons={additionalButtons}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {props.type === "delete" && (
            <div className="flex justify-center">
              <span className="text-lg font-bold text-red-500">
                DO YOU WANT TO DELETE THIS VARIANT?
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <ShowNotShow
              show={shown}
              setShow={setShown}
              disabled={props.type === "delete" || disabled}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={name}
              disabled={props.type === "delete" || disabled}
              onChange={onNameChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Price</label>
            <input
              name="price"
              id="price"
              value={priceStr}
              disabled={props.type === "delete" || disabled}
              onChange={onPriceChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <Promotion
            onChange={onPromotionChange}
            initPromotion={initPromotion}
            disabled={props.type === "delete" || disabled}
          />
          {props.type === "delete" || disabled ? null : (
            <div className="flex justify-center">
              <label
                htmlFor="image"
                className="p-2 text-center bg-gray-300 border-2 border-black rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 shadow-black w-[150px] mx-auto active:bg-gray-300 active:shadow-none"
              >
                {image ? "Change Image" : "Add Image"}
              </label>
              <input
                hidden
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={onImageChange}
              />
            </div>
          )}

          <div className="flex justify-center">
            {image ? (
              <Image
                src={
                  isImageType(image) ? image.src : URL.createObjectURL(image)
                }
                alt="variant image"
                width={208}
                height={208}
                className="rounded-lg w-52 h-52"
              />
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
}

/*************************
 * Components
 */

const ShowNotShow = ({
  show,
  setShow,
  disabled,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
  disabled?: boolean;
}) => {
  if (disabled)
    return (
      <div className="flex items-center">
        <div className="text-lg font-bold text-gray-900">
          {show ? "Show" : "Not Show"}
        </div>
      </div>
    );
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={show}
        onChange={setShow}
        className={classNames(
          show ? "bg-blue-950" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            show ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="text-lg text-gray-900">
          {show ? "Show" : "Not Show"}
        </span>{" "}
      </Switch.Label>
    </Switch.Group>
  );
};
