"use client";

import Image from "next/image";
import Modal from "@/components/layout/Modal";

import useNewCatModal from "./hooks";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewCatModal({ isOpen, setIsOpen }: Props) {
  const {
    onClose,
    additionalButtons,
    image,
    name,
    description,
    onNameChange,
    onDescriptionChange,
    setImage,
  } = useNewCatModal();
  return (
    <Modal
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
              {image ? "Change Image" : "Add Image"}
            </label>
            <input
              hidden
              id="image"
              name="image"
              type="file"
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
