import { OnSubmitProps } from "../Product";
import { WithID, Product as ProductType, ProductResponse } from "@/types";

export default function useDeleteProductModal() {
  const onDelete = (
    props: OnSubmitProps
  ): Promise<{ data: WithID<ProductType> }> => {
    return new Promise((resolve, reject) => {
      deleteProduct(props, (res) => {
        if (res.errorMessage) {
          reject(new Error(res.errorMessage));
        }

        resolve({
          data: res.data as WithID<ProductType>,
        });
      });
    });
  };

  const submitButton = {
    text: "Delete",
    className: "bg-red-900 text-white hover:bg-red-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onDelete,
  };
}

/*******************************
 * Utils
 */

type DeleteProduct = (
  product: OnSubmitProps,
  cb: (res: ProductResponse) => void
) => void;

const deleteProduct: DeleteProduct = (product, cb) => {
  fetch("/api/products?action=delete", {
    method: "POST",
    body: JSON.stringify({
      id: product.id,
    }),
  })
    .then((res) => res.json())
    .then((res) => cb(res));
};
