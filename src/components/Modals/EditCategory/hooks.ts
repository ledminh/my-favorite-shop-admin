import { Category as CategoryType, Image as ImageType, WithID } from "@/types";

import { useEffect, useState } from "react";

export default function useEditCategoryModal(item: WithID<CategoryType>) {
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

  const onSave = () => {
    console.log("Save", {
      id: item.id,
      name,
      description,
      image,
    });
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
    onSave,
  };
}

/******************************
 * Utils
 */

function isImage(item: ImageType | File): item is ImageType {
  return (item as ImageType).src !== undefined;
}
