import { NextRequest, NextResponse } from "next/server";
import uploadImage from "@/utils/uploadImage";
import getID from "@/utils/getID";
import { addCategory } from "@/data/categories";

export default async function add(request: NextRequest) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;

  const { imagePath, error } = await uploadImage(
    name.split(" ").join("-") + "-" + getID(),
    "category",
    imageFile
  );

  if (error) {
    throw new Error(error.message);
  }

  const newCategory = await addCategory({
    name,
    link: name?.toString().toLowerCase().replace(/\s/g, "-"),
    description,
    image: {
      src: imagePath,
      alt: name,
    },
  });

  return NextResponse.json({
    data: newCategory,
  });
}
