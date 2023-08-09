import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_STORAGE_URL as string,
  process.env.SUPABASE_API_KEY as string,
  {
    auth: { persistSession: false },
  }
);

export default async function deleteImages(filePaths: string[]) {
  return supabase.storage.from("nail-supply-v3").remove(filePaths);
}
