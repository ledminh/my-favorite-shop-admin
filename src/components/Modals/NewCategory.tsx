"use client";

import { useState } from "react";
import Image from "next/image";
import ModalLg from "../layout/ModalLg";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewCatModal({ isOpen, setIsOpen }: Props) {
  const [image, setImage] = useState<File | null>(null);

  const additionalButtons = [
    {
      text: "Add",
      className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
      onClick: () => {},
    },
  ];
  return (
    <ModalLg
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="ADD NEW CATEGORY"
      additionalButtons={additionalButtons}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div className="flex justify-center">
            <label
              htmlFor="image"
              className="p-2 text-center bg-gray-300 border-2 border-black rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 shadow-black w-[150px] mx-auto active:bg-gray-300 active:shadow-none"
            >
              {image ? "Change Image" : "Add Image"}
            </label>
            <input
              hidden
              type="file"
              name="image"
              id="image"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="flex justify-center">
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="placeholder"
                width={150}
                height={150}
                className="rounded-lg"
              />
            ) : null}
          </div>
        </div>
      </div>
    </ModalLg>
  );
}
