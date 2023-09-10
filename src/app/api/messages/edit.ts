import { NextRequest, NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";
import deleteImages from "@/utils/deleteImages";

import getID from "@/utils/getID";
import { updateCategory, getCategory } from "@/data/categories";

import isValidJSON from "@/utils/isValidJSON";

import { Image as ImageType } from "@/types";

export default async function edit(request: NextRequest) {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const formImage = formData.get("image") as string | File;

  let image: ImageType;

  if (isValidJSON(formImage)) {
    // user didn't change the image --> image === ImageType
    image = JSON.parse(formImage as string) as ImageType;
  } else {
    // user changed the image --> image === File

    const { imagePath, error } = await uploadImage(
      name.split(" ").join("-") + "-" + getID(),
      "category",
      formImage as File
    );

    if (error) {
      throw new Error(error.message);
    }

    // Delete old image
    const oldCategory = await getCategory({ id });

    const filePath = ("category/" +
      oldCategory.image.src.split("/").pop()) as string;

    const { error: deleteImageError } = await deleteImages([filePath]);

    if (deleteImageError) {
      throw new Error(deleteImageError.message);
    }

    image = {
      src: imagePath,
      alt: name,
    };
  }

  const updatedCategory = await updateCategory(id, {
    name: name as string,
    link: name?.toString().toLowerCase().replace(/\s/g, "-") as string,
    description: description as string,
    image,
  });

  return NextResponse.json({
    data: updatedCategory,
  });
}
