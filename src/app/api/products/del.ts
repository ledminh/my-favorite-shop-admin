import { NextRequest, NextResponse } from "next/server";

import { getProduct, deleteProduct } from "@/data/products";
import deleteImages from "@/utils/deleteImages";

export default async function del(request: NextRequest) {
  const { id } = await request.json();

  const oldProduct = await getProduct({ id });

  const productImgPaths = oldProduct.images.map((image) => {
    return "product/" + image.src.split("/").pop();
  });

  const variantImgPaths =
    oldProduct.variants?.map((variant) => {
      return "product/" + variant.image.src.split("/").pop();
    }) || [];

  const filePaths = [...productImgPaths, ...variantImgPaths];

  const { error: deleteImageError } = await deleteImages(filePaths);

  if (deleteImageError) {
    throw new Error(deleteImageError.message);
  }

  await deleteProduct(id);

  return NextResponse.json({
    data: oldProduct,
  });
}
