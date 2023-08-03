"use client";

import Image from "next/image";
import Modal from "@/components/layout/Modal";

import useCategoryModal from "./hooks";

export type OnSubmitProps = {
  name: string;
  description: string;
  image: File | null;
};

export type Props = {
  type: "add" | "edit" | "delete";
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitButton: {
    text: string;
    className: string;
    disabledClassName: string;
  };
  onSubmit: (props: OnSubmitProps) => void;
  initName?: string;
  initDescription?: string;
  initImage?: File | null;
};

export default function CategoryModal(props: Props) {
  const {
    onClose,
    additionalButtons,
    image,
    name,
    description,
    onNameChange,
    onDescriptionChange,
    onImageChange,
  } = useCategoryModal(props);

  const { isOpen, setIsOpen, title } = props;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
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
              onChange={onImageChange}
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
