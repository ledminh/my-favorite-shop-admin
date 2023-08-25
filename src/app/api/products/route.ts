import { StorageError } from "@supabase/storage-js";

import // getCategory,
// updateCategory,
// deleteCategory,
"@/data/products";

import add from "./add";
import edit from "./edit";

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
      case "edit":
        return edit(request);
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
