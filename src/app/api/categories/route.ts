import { addCategory } from "@/data/categories";
import { AddNewCategoryResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

import uploadImage from "@/utils/uploadImage";

export async function POST(
  request: NextRequest
): Promise<NextResponse<AddNewCategoryResponse>> {
  try {
    const action = request.nextUrl.searchParams.get("action");

    if (action !== "add") {
      throw new Error("action not found");
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");

    const uploadedImage = await uploadImage(image as File);

    const newCategory = await addCategory({
      name: name as string,
      link: name?.toString().toLowerCase().replace(/\s/g, "-") as string,
      description: description as string,
      image: uploadedImage,
    });

    return NextResponse.json({
      data: newCategory,
    });
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message });
  }
}
