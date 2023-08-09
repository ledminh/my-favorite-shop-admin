import { Category as CategoryType, WithID } from "@/types";

import { CategoryResponse } from "@/types";

export default function useDeleteCategoryModal(item: WithID<CategoryType>) {
  /**********************
   * Public
   */

  const onDelete = (): Promise<{ data: WithID<CategoryType> }> => {
    return new Promise((resolve, reject) => {
      deleteCategory(
        {
          id: item.id,
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
    text: "Delete",
    className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    onDelete,
    submitButton,
  };
}

/******************************
 * Utils
 */

type DeleteCategory = (
  categoryInfo: {
    id: string;
  },
  cb: (res: CategoryResponse) => void
) => void;

const deleteCategory: DeleteCategory = ({ id }, cb) => {
  fetch("/api/categories?action=delete", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => cb(res));
};
