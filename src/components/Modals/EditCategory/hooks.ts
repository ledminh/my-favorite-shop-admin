import { Category as CategoryType, Image as ImageType, WithID } from "@/types";

import isImageType from "@/utils/isImageType";

import { useEffect, useState } from "react";

import { UpdateCategoryResponse } from "@/types";

export default function useEditCategoryModal(item: WithID<CategoryType>) {
  /**********************
   * Private
   */
  const {
    name: initName,
    description: initDescription,
    image: initImage,
  } = item;

  const [name, setName] = useState(initName);
  const [description, setDescription] = useState(initDescription);
  const [image, setImage] = useState<File | ImageType>(initImage);

  useEffect(() => {
    setName(initName);
    setDescription(initDescription);
    setImage(initImage);
  }, [initName, initDescription, initImage]);

  /**********************
   * Public
   */
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const reset = () => {
    setName(initName);
    setDescription(initDescription);
    setImage(initImage);
  };

  const onSave = () => {
    updateCategory(
      {
        id: item.id,
        name,
        description,
        image,
      },
      (res) => {
        if (res.errorMessage) {
          throw new Error(res.errorMessage);
        }

        console.log(res);
      }
    );
  };

  return {
    name,
    description,
    image: isImageType(image)
      ? image
      : {
          src: URL.createObjectURL(image),
          alt: image.name,
        },
    onNameChange,
    onDescriptionChange,
    onImageChange,
    onSave,
    reset,
  };
}

/******************************
 * Utils
 */

type UpdateCategory = (
  category: {
    id: string;
    name: string;
    description: string;
    image: File | ImageType;
  },
  cb: (res: UpdateCategoryResponse) => void
) => void;

const updateCategory: UpdateCategory = (category, cb) => {
  const formData = new FormData();

  formData.append("id", category.id);
  formData.append("name", category.name);
  formData.append("description", category.description);
  formData.append(
    "image",
    isImageType(category.image)
      ? JSON.stringify(category.image)
      : category.image
  );

  fetch("/api/categories?action=edit", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => cb(res));
};
