import { OnSubmitProps } from "../Product";
import {
  WithID,
  Product as ProductType,
  ProductResponse,
  Variant,
} from "@/types";

export default function useNewProductModal() {
  const onAdd = (
    props: OnSubmitProps
  ): Promise<{ data: WithID<ProductType> }> => {
    return new Promise((resolve, reject) => {
      addNewProduct(props, (res) => {
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
  product: OnSubmitProps,
  cb: (res: ProductResponse) => void
) => void;

const addNewProduct: AddNewProduct = (product, cb) => {
  const formData = new FormData();
  formData.append("id", product.id);
  formData.append("categoryID", product.categoryID);
  formData.append("name", product.name);

  formData.append("intro", product.intro);
  formData.append("description", product.description);

  formData.append("promotion", JSON.stringify(product.promotion));

  if (product.price) {
    formData.append("price", product.price.toString());
    formData.append("numberOfVariants", "0");
  } else if (product.variants) {
    for (let i = 0; i < product.variants.length; i++) {
      const { shown, name, price, image, promotion } = product.variants[i];

      const variantJSON = {
        shown,
        name,
        price,
        promotion,
      };

      formData.append("variant-" + (i + 1), JSON.stringify(variantJSON));
      formData.append("variant-image-" + (i + 1), image as File);
    }

    formData.append("numberOfVariants", product.variants.length.toString());
  }

  for (let i = 0; i < product.images.length; i++) {
    formData.append("image-" + (i + 1), product.images[i] as File);
  }

  formData.append("numberOfImages", product.images.length.toString());

  fetch("/api/products?action=add", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => cb(res));
};
