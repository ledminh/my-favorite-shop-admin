import { OnSubmitProps } from "../Product";
import { WithID, Product as ProductType, ProductResponse } from "@/types";

export default function useNewProductModal() {
  const onAdd = (
    props: OnSubmitProps
  ): Promise<{ data: WithID<ProductType> }> => {
    return new Promise((resolve, reject) => {
      addNewProduct(
        {
          // name,
          // description,
          // image: image as File,
        },
        (res) => {
          if (res.errorMessage) {
            reject(new Error(res.errorMessage));
          }

          resolve({
            data: res.data as WithID<ProductType>,
          });
        }
      );
    });
  };

  const submitButton = {
    text: "Add",
    className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onAdd,
  };
}

/*******************************
 * Utils
 */

type AddNewProduct = (
  product: {
    // name: string;
    // description: string;
    // image: File;
  },
  cb: (res: ProductResponse) => void
) => void;

const addNewProduct: AddNewProduct = (product, cb) => {
  const formData = new FormData();
  // formData.append("name", category.name);
  // formData.append("description", category.description);
  // formData.append("image", category.image);

  fetch("/api/products?action=add", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => cb(res));
};
