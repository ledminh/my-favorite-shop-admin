import { useState } from "react";

import { AddNewCategoryResponse } from "@/types";

export default function useNewCatModal() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onClose = () => {
    setImage(null);
  };

  const onAdd = () => {
    addNewCategory(
      {
        name,
        description,
        image: image as File,
      },
      (res) => {
        if (res.errorMessage) {
          throw new Error(res.errorMessage);
        }

        console.log(res);
      }
    );
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const additionalButtons: {
    text: string;
    className: string;
    onClick: () => void;
    disabled?: boolean;
    disabledClassName?: string;
  }[] = [
    {
      text: "Add",
      className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
      onClick: onAdd,
      disabled: !image || name === "" || description === "",
      disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
  ];

  return {
    image,
    name,
    description,
    setImage,
    onClose,
    onNameChange,
    onDescriptionChange,
    additionalButtons,
  };
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
  cb: (res: AddNewCategoryResponse) => void
) => void;

const addNewCategory: AddNewCategory = (category, cb) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("description", category.description);
  formData.append("image", category.image);

  fetch("/api/categories?action=add", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => cb(res));
};
