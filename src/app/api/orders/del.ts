import { NextRequest, NextResponse } from "next/server";

import deleteImages from "@/utils/deleteImages";
import { deleteCategory, getCategory } from "@/data/categories";

export default async function del(request: NextRequest) {
  const { id } = await request.json();

  const oldCategory = await getCategory({ id });

  const filePath = ("category/" +
    oldCategory.image.src.split("/").pop()) as string;

  const { error: deleteImageError } = await deleteImages([filePath]);

  if (deleteImageError) {
    throw new Error(deleteImageError.message);
  }

  await deleteCategory(id);

  return NextResponse.json({
    data: oldCategory,
  });
}
