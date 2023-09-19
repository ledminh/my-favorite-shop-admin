import { StorageError } from "@supabase/storage-js";

import { addProduct } from "@/data/products";

import { WithID, Promotion, Variant as VariantType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";
import isValidJSON from "@/utils/isValidJSON";
import getID from "@/utils/getID";

export default async function add(request: NextRequest) {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const categoryID = formData.get("categoryID") as string;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string | null;
  const intro = formData.get("intro") as string;
  const description = formData.get("description") as string;

  // promotion
  const promotionStr = formData.get("promotion") as string;
  const promotion = isValidJSON(promotionStr)
    ? (JSON.parse(promotionStr) as Promotion)
    : null;

  // variants
  const numberOfVariants = parseInt(formData.get("numberOfVariants") as string);

  let variants: WithID<VariantType>[] | undefined = undefined;

  if (numberOfVariants > 0) {
    const variantImages = await processVariantImages(
      formData,
      name,
      numberOfVariants
    );

    variants = processVariants(formData, numberOfVariants, variantImages);
  }

  // images
  const images = await processImages(formData, name);

  let productToAdd =
    price === null
      ? {
          id,
          categoryID,
          name,
          intro,
          description,
          mainImageID: images[0].id,
          images,
          variants,
          promotion: promotion ? promotion : undefined,
        }
      : {
          id,
          categoryID,
          name,
          price: parseInt(price),
          intro,
          description,
          mainImageID: images[0].id,
          images,
          promotion: promotion ? promotion : undefined,
        };

  const newProduct = await addProduct(productToAdd);

  return NextResponse.json({
    data: newProduct,
  });
}

/*****************************
 * Helpers
 */
async function processVariantImages(
  formData: FormData,
  productName: string,
  numberOfVariants: number
) {
  const variantImgPromises: Promise<
    | { error: StorageError; imagePath: null }
    | { error: null; imagePath: string }
  >[] = [];

  for (let i = 0; i < numberOfVariants; i++) {
    const varImgFile = formData.get("variant-image-" + (i + 1)) as File;

    const promise = uploadImage(
      productName.split(" ").join("-") + "-" + getID(),
      "product",
      varImgFile
    );

    variantImgPromises.push(promise);
  }

  const variantImages = await Promise.all(variantImgPromises);

  if (variantImages.some((img) => img.error)) {
    throw new Error(variantImages.find((img) => img.error)?.error?.message);
  }

  return variantImages as { error: null; imagePath: string }[];
}

function processVariants(
  formData: FormData,
  numberOfVariants: number,
  variantImages: { error: null; imagePath: string }[]
) {
  const variants: WithID<VariantType>[] = [];

  for (let i = 0; i < numberOfVariants; i++) {
    const variantStr = formData.get("variant-" + (i + 1)) as string;

    if (isValidJSON(variantStr) === false) {
      throw new Error("Invalid variant");
    }

    const variant = JSON.parse(variantStr) as WithID<VariantType>;

    variant.id = `variant-${variant.name}-${i + 1}`;

    variant.image = {
      src: variantImages[i].imagePath as string,
      alt: variant.name,
    };

    variants.push(variant);
  }

  return variants;
}

async function processImages(formData: FormData, productName: string) {
  const imgPromises: Promise<
    | { error: StorageError; imagePath: null }
    | { error: null; imagePath: string }
  >[] = [];

  const numberOfImages = parseInt(formData.get("numberOfImages") as string);

  for (let i = 0; i < numberOfImages; i++) {
    const imgFile = formData.get("image-" + (i + 1)) as File;
    const promise = uploadImage(
      productName.split(" ").join("-") + "-" + getID(),
      "product",
      imgFile
    );
    imgPromises.push(promise);
  }

  const images = await Promise.all(imgPromises);

  if (images.some((img) => img.error)) {
    throw new Error(images.find((img) => img.error)?.error?.message);
  }

  const imageFiles = [];

  for (let i = 0; i < numberOfImages; i++) {
    imageFiles.push({
      id: `image-${productName}-${getID()}`,
      src: images[i].imagePath as string,
      alt: productName,
    });
  }

  return imageFiles;
}
