import { Image as ImageType } from "@/types";

// import { createClient } from "@supabase/supabase-js";
// import { FileOptions } from "@supabase/storage-js";

// const supabase = createClient(
//   // process.env.SUPABASE_STORAGE_URL as string,
//   // process.env.SUPABASE_API_KEY as string
// );

export default function uploadImage(
  image: File,
  directory: string
): Promise<ImageType> {
  return new Promise((resolve, reject) => {
    resolve({
      src: "/test",
      alt: "test",
    });
  });
}
// Co-pilot generated code

// const bucketName = "images";
// const filePath = `${directory}/${image.name}`;
// const fileOptions: FileOptions = {
//   cacheControl: "3600",
//   upsert: false,
// };

// supabase.storage.createBucket(bucketName).then(() => {
//   supabase.storage
//     .from(bucketName)
//     .upload(filePath, image, fileOptions)
//     .then((response) => {
//       const { data, error } = response;
//       if (error) {
//         reject(error);
//       } else {
//         resolve(data);
//       }
//     });
// });

// My old code
// return supabase.storage.from(bucketName).upload(filePath, file, fileOptions);
