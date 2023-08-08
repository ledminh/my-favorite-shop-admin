import { createClient } from "@supabase/supabase-js";
import { FileOptions } from "@supabase/storage-js";

const supabase = createClient(
  process.env.SUPABASE_STORAGE_URL as string,
  process.env.SUPABASE_API_KEY as string,
  {
    auth: { persistSession: false },
  }
);

// Upload file using standard upload
export default async function uploadImage(
  fileName: string,
  directory: string,
  image: File
) {
  const fileType = image.name.split(".")[1];
  const filePath = `${directory}/${fileName}.${
    fileType === "jpeg" ? "jpg" : fileType
  }`;

  const fileOptions: FileOptions = {
    contentType: image.type || "image/jpeg",
    cacheControl: "3600",
  };

  const { data, error } = await supabase.storage
    .from("nail-supply-v3")
    .upload(filePath, image, fileOptions);

  if (error) {
    return {
      error,
      imagePath: null,
    };
  }

  return {
    error: null,
    imagePath: process.env.SUPABASE_IMAGE_URL + data.path,
  };
}
