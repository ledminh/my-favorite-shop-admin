import { addCategory, updateCategory } from "@/data/categories";
import { AddNewCategoryResponse, Image as ImageType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";
import isValidJSON from "@/utils/isValidJSON";

export async function POST(
  request: NextRequest
): Promise<NextResponse<AddNewCategoryResponse>> {
  try {
    const action = request.nextUrl.searchParams.get("action");

    switch (action) {
      case "add":
        return add(request);
      case "edit":
        return edit(request);
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

  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");

  const uploadedImage = await uploadImage(image as File, "categories");

  const newCategory = await addCategory({
    name: name as string,
    link: name?.toString().toLowerCase().replace(/\s/g, "-") as string,
    description: description as string,
    image: uploadedImage,
  });

  return NextResponse.json({
    data: newCategory,
  });
}

async function edit(request: NextRequest) {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const formImage = formData.get("image") as string | File;

  const uploadedImage = isValidJSON(formImage)
    ? (JSON.parse(formImage as string) as ImageType)
    : await uploadImage(formImage as File, "categories");

  const updatedCategory = await updateCategory(id, {
    name: name as string,
    link: name?.toString().toLowerCase().replace(/\s/g, "-") as string,
    description: description as string,
    image: uploadedImage,
  });

  return NextResponse.json({
    data: updatedCategory,
  });
}
