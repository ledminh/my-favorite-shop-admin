import { Image as ImageType } from "@/types";

export default function isImageType(item: ImageType | File): item is ImageType {
  return (item as ImageType).src !== undefined;
}
