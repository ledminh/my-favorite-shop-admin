"use client";

import Image from "next/image";
import Modal from "@/components/layout/Modal";

import useVariantModal from "./hooks";

import isImageType from "@/utils/isImageType";

import { Props } from "./types";
import Promotion from "@/components/Promotion";

export default function VariantModal(props: Props) {
  const {
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

  const { isOpen, setIsOpen, title } = props;

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
          <div className="flex flex-col gap-2">Show/notshow</div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={name}
              disabled={props.type === "delete"}
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
              onChange={onPriceChange}
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <Promotion onChange={onPromotionChange} />

          {props.type === "delete" ? null : (
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
                alt="category image"
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
