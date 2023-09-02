import { StorageError } from "@supabase/storage-js";

import { getProduct, updateProduct } from "@/data/products";

import {
  WithID,
  Image as ImageType,
  Promotion,
  Variant as VariantType,
} from "@/types";
import { NextRequest, NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";
import isValidJSON from "@/utils/isValidJSON";
import getID from "@/utils/getID";
import deleteImages from "@/utils/deleteImages";
import isImageType from "@/utils/isImageType";

export default async function edit(request: NextRequest) {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const categoryID = formData.get("categoryID") as string;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const intro = formData.get("intro") as string;
  const description = formData.get("description") as string;

  // promotion
  const promotionStr = formData.get("promotion") as string;

  const promotion = isValidJSON(promotionStr)
    ? (JSON.parse(promotionStr) as Promotion)
    : undefined;

  // variants
  const numberOfVariants = parseInt(formData.get("numberOfVariants") as string);

  let variants: WithID<VariantType>[] | undefined = undefined;

  if (numberOfVariants > 0) {
    const variantImagesUploaded = await processVariantImages(
      formData,
      name,
      numberOfVariants
    );

    variants = processVariants(
      formData,
      numberOfVariants,
      variantImagesUploaded
    );
  }

  // images
  const images = await processImages(formData, name);

  // Delete old image
  const oldProduct = await getProduct({ id });

  // compare old images with new images
  const oldImages = oldProduct.images.map((img) => img.src);
  const newImages = images.map((img) => img.src);

  const imagesToDelete = oldImages.filter((img) => !newImages.includes(img));

  const filePaths = imagesToDelete.map(
    (img) => ("product/" + img.split("/").pop()) as string
  );

  if (filePaths.length > 0) {
    const { error: deleteImageError } = await deleteImages(filePaths);

    if (deleteImageError) {
      throw new Error(deleteImageError.message);
    }
  }

  // update product
  const updatedProduct = await updateProduct({
    id,
    categoryID,
    name,
    price: parseInt(price),
    intro,
    description,
    mainImageID: images[0].id,
    images,
    variants,
    promotion: promotion ? promotion : undefined,
  });

  return NextResponse.json({
    data: updatedProduct,
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
    const variantImage = isValidJSON(
      formData.get("variant-image-" + (i + 1)) as string | File
    )
      ? (JSON.parse(
          formData.get("variant-image-" + (i + 1)) as string
        ) as ImageType)
      : (formData.get("variant-image-" + (i + 1)) as File);

    if (!isImageType(variantImage)) {
      const promise = uploadImage(
        productName.split(" ").join("-") + "-" + getID(),
        "product",
        variantImage
      );

      variantImgPromises.push(promise);
    }
  }

  const variantImagesUploaded = await Promise.all(variantImgPromises);

  if (variantImagesUploaded.some((img) => img.error)) {
    throw new Error(
      variantImagesUploaded.find((img) => img.error)?.error?.message
    );
  }

  return variantImagesUploaded as { error: null; imagePath: string }[];
}

function processVariants(
  formData: FormData,
  numberOfVariants: number,
  variantImagesUploaded: { error: null; imagePath: string }[]
) {
  const variants: WithID<VariantType>[] = [];
  let iVariantImageUploaded = 0;

  for (let i = 0; i < numberOfVariants; i++) {
    const variantStr = formData.get("variant-" + (i + 1)) as string;

    if (isValidJSON(variantStr) === false) {
      throw new Error("Invalid variant");
    }

    const variant = JSON.parse(variantStr) as WithID<VariantType>;

    variant.id = `variant-${variant.name}-${i + 1}`;

    const variantImage = isValidJSON(
      formData.get("variant-image-" + (i + 1)) as string | File
    )
      ? (JSON.parse(
          formData.get("variant-image-" + (i + 1)) as string
        ) as ImageType)
      : (formData.get("variant-image-" + (i + 1)) as File);

    if (isImageType(variantImage)) {
      variant.image = variantImage;
    } else {
      variant.image = {
        src: variantImagesUploaded[iVariantImageUploaded].imagePath as string,
        alt: variant.name,
      };

      iVariantImageUploaded++;
    }

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
    const image = isValidJSON(formData.get("image-" + (i + 1)) as string | File)
      ? (JSON.parse(formData.get("image-" + (i + 1)) as string) as ImageType)
      : (formData.get("image-" + (i + 1)) as File);

    if (!isImageType(image)) {
      const promise = uploadImage(
        productName.split(" ").join("-") + "-" + getID(),
        "product",
        image
      );

      imgPromises.push(promise);
    }
  }

  const images = await Promise.all(imgPromises);

  if (images.some((img) => img.error)) {
    throw new Error(images.find((img) => img.error)?.error?.message);
  }

  const imageFiles: WithID<ImageType>[] = [];

  for (let i = 0; i < numberOfImages; i++) {
    const image = isValidJSON(formData.get("image-" + (i + 1)) as string | File)
      ? (JSON.parse(
          formData.get("image-" + (i + 1)) as string
        ) as WithID<ImageType>)
      : (formData.get("image-" + (i + 1)) as File);

    if (isImageType(image)) {
      imageFiles.push(image);
    } else {
      imageFiles.push({
        id: `image-${productName.split(" ").join("-")}-${getID()}`,
        src: images[i].imagePath as string,
        alt: productName,
      });
    }
  }

  return imageFiles;
}
