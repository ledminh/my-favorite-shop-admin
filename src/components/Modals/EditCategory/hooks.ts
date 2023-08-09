import { Category as CategoryType, Image as ImageType, WithID } from "@/types";

import isImageType from "@/utils/isImageType";

import { CategoryResponse } from "@/types";

import { OnSubmitProps } from "../Category";

export default function useEditCategoryModal(item: WithID<CategoryType>) {
  /**********************
   * Public
   */

  const onSave = ({
    name,
    description,
    image,
  }: OnSubmitProps): Promise<{ data: WithID<CategoryType> }> => {
    return new Promise((resolve, reject) => {
      updateCategory(
        {
          id: item.id,
          name,
          description,
          image: image as File | ImageType,
        },
        (res) => {
          if (res.errorMessage) {
            reject(new Error(res.errorMessage));
          }

          resolve({
            data: res.data as WithID<CategoryType>,
          });
        }
      );
    });
  };

  const submitButton = {
    text: "Save",
    className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    onSave,
    submitButton,
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
  cb: (res: CategoryResponse) => void
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
