import { useState } from "react";
import Image from "next/image";
import { Category as CategoryType } from "@/types";
import useEditCategoryModal from "./hooks";

type Props = {
  item: CategoryType;
};

const EditCategoryModal = ({ item }: Props) => {
  const {
    name,
    description,
    image,
    onNameChange,
    onDescriptionChange,
    onImageChange,
  } = useEditCategoryModal(item);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={onNameChange}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onDescriptionChange}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex justify-center">
          <label
            htmlFor="image"
            className="p-2 text-center bg-gray-300 border-2 border-black rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 shadow-black w-[150px] mx-auto active:bg-gray-300 active:shadow-none"
          >
            Change Image
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

        <div className="flex justify-center">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              className="rounded-lg"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
