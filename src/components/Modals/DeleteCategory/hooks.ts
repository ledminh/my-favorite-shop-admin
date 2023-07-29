import { Category as CategoryType, Image as ImageType, WithID } from "@/types";

export default function useDeleteCategoryModal(item: WithID<CategoryType>) {
  const { name, description, image } = item;

  const onDelete = () => {
    console.log("Delete", {
      name,
      description,
    });
  };

  return {
    name,
    description,
    image,
    onDelete,
  };
}
