import { StorageError } from "@supabase/storage-js";

import {
  addProduct,
  // getCategory,
  // updateCategory,
  // deleteCategory,
} from "@/data/products";
import {
  WithID,
  ProductResponse,
  Image as ImageType,
  Promotion,
  Variant as VariantType,
} from "@/types";
import { NextRequest, NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";
import isValidJSON from "@/utils/isValidJSON";
import getID from "@/utils/getID";
import deleteImages from "@/utils/deleteImages";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ProductResponse>> {
  try {
    const action = request.nextUrl.searchParams.get("action");

    switch (action) {
      case "add":
        return add(request);
      // case "edit":
      //   return edit(request);
      // case "delete":
      //   return del(request);

      default:
        throw new Error("action not found");
    }
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}

/*****************************
 * Utils
 */

async function add(request: NextRequest) {
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

  const newProduct = await addProduct({
    id,
    categoryID,
    name,
    price: parseInt(price),
    intro,
    description,
    mainImageID: `image-${name}-1`,
    images,
    variants,
    promotion: promotion ? promotion : undefined,
  });

  return NextResponse.json({
    data: newProduct,
  });
}

// async function edit(request: NextRequest) {
//   const formData = await request.formData();

//   const id = formData.get("id") as string;
//   const name = formData.get("name") as string;
//   const description = formData.get("description") as string;
//   const formImage = formData.get("image") as string | File;

//   let image: ImageType;

//   if (isValidJSON(formImage)) {
//     // user didn't change the image --> image === ImageType
//     image = JSON.parse(formImage as string) as ImageType;
//   } else {
//     // user changed the image --> image === File

//     const { imagePath, error } = await uploadImage(
//       name.split(" ").join("-") + "-" + getID(),
//       "category",
//       formImage as File
//     );

//     if (error) {
//       throw new Error(error.message);
//     }

//     // Delete old image
//     const oldCategory = await getCategory({ id });

//     const filePath = ("category/" +
//       oldCategory.image.src.split("/").pop()) as string;

//     const { error: deleteImageError } = await deleteImages([filePath]);

//     if (deleteImageError) {
//       throw new Error(deleteImageError.message);
//     }

//     image = {
//       src: imagePath,
//       alt: name,
//     };
//   }

//   const updatedCategory = await updateCategory(id, {
//     name: name as string,
//     link: name?.toString().toLowerCase().replace(/\s/g, "-") as string,
//     description: description as string,
//     image,
//   });

//   return NextResponse.json({
//     data: updatedCategory,
//   });
// }

// async function del(request: NextRequest) {
//   const { id } = await request.json();

//   const oldCategory = await getCategory({ id });

//   const filePath = ("category/" +
//     oldCategory.image.src.split("/").pop()) as string;

//   const { error: deleteImageError } = await deleteImages([filePath]);

//   if (deleteImageError) {
//     throw new Error(deleteImageError.message);
//   }

//   await deleteCategory(id);

//   return NextResponse.json({
//     data: oldCategory,
//   });
// }

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
      id: `image-${productName}-${i + 1}`,
      src: images[i].imagePath as string,
      alt: productName,
    });
  }

  return imageFiles;
}
