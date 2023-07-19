import { useState } from "react";

export default function useNewCatModal() {
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

  const additionalButtons: {
    text: string;
    className: string;
    onClick: () => void;
  }[] = [
    {
      text: "Add",
      className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
      onClick: onAdd,
    },
  ];

  return {
    image,
    setImage,
    onClose,
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
