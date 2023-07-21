import { Category as CategoryType, Image as ImageType } from "@/types";

import { useState } from "react";

export default function useEditCategoryModal(item: CategoryType) {
  const {
    name: initName,
    description: initDescription,
    image: initImage,
  } = item;

  const [name, setName] = useState(initName);
  const [description, setDescription] = useState(initDescription);
  const [image, setImage] = useState<File | ImageType>(initImage);

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

  return {
    name,
    description,
    image: isImage(image)
      ? image
      : {
          src: URL.createObjectURL(image),
          alt: image.name,
        },
    onNameChange,
    onDescriptionChange,
    onImageChange,
  };
}

/******************************
 * Utils
 */

function isImage(item: ImageType | File): item is ImageType {
  return (item as ImageType).src !== undefined;
}
