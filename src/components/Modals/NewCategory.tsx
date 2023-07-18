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

  const onClose = () => {
    setImage(null);
  };

  const onAdd = () => {
    addNewCategory(
      {
        name: "test",
        description: "test",
        image: image!,
      },
      (res, err) => {
        if (err) {
          throw err;
        }

        console.log(res);
      }
    );
  };

  const additionalButtons = [
    {
      text: "Add",
      className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
      onClick: onAdd,
    },
  ];
  return (
    <ModalLg
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="ADD NEW CATEGORY"
      onClose={onClose}
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
              accept="image/*"
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
                alt="category image"
                width={200}
                height={200}
                className="rounded-lg"
              />
            ) : null}
          </div>
        </div>
      </div>
    </ModalLg>
  );
}

/*******************************
 * Utils
 */

type AddNewCategory = (
  category: {
    name: string;
    description: string;
    image: File;
  },
  cb: (res: any | null, err: Error | null) => void
) => void;

const addNewCategory: AddNewCategory = (category, cb) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("description", category.description);
  formData.append("image", category.image);

  fetch("/api/categories", {
    method: "POST",
    body: formData,
  })
    .then((res) => cb(res, null))
    .catch((err) => cb(null, err));
};
