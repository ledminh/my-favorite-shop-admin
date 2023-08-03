import { useState } from "react";

import { AddNewCategoryResponse } from "@/types";

import { Props } from "./";

export default function useNewCatModal(props: Props) {
  /***********************
   * PRIVATE
   */

  // States
  const { initName, initDescription, initImage, submitButton, onSubmit } =
    props;

  const [name, setName] = useState(initName || "");
  const [description, setDescription] = useState(initDescription || "");
  const [image, setImage] = useState<File | null>(initImage || null);

  // Functions
  const onClose = () => {
    setImage(null);
  };

  const reset = () => {
    setName("");
    setDescription("");
    setImage(null);
  };

  const _onSubmit = () => {
    onSubmit({
      name,
      description,
      image: image as File,
    });

    reset();
  };

  const isDisabled = () => {
    return name === "" || description === "" || !image;
  };

  /***********************
   * PUBLIC
   */

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const additionalButtons: {
    text: string;
    className: string;
    disabledClassName?: string;
    onClick: () => void;
    disabled?: boolean;
  }[] = [
    {
      ...submitButton,
      disabled: isDisabled(),
      onClick: _onSubmit,
    },
  ];

  return {
    image,
    name,
    description,
    onClose,
    onNameChange,
    onDescriptionChange,
    onImageChange,
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
