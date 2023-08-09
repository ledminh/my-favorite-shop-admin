import { Category as CategoryType, WithID } from "@/types";
import useDeleteCategoryModal from "./hooks";

import CategoryModal from "../Category";

import Image from "next/image";

type Props = {
  item: WithID<CategoryType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterDelete: (item: WithID<CategoryType>) => void;
};

const DeleteCategoryModal = ({
  item,
  isOpen,
  setIsOpen,
  afterDelete,
}: Props) => {
  const { submitButton, onDelete } = useDeleteCategoryModal(item);

  return (
    <CategoryModal
      type="delete"
      title="Delete Category"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitButton={submitButton}
      onSubmit={onDelete}
      afterSubmit={afterDelete}
      initName={item.name}
      initDescription={item.description}
      initImage={item.image}
    />
  );
};

export default DeleteCategoryModal;

/**************************
 * Components
 */
// TODO: add this block to CategoryModal for type="delete"
const CategoryDetails = ({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: { src: string; alt: string };
}) => (
  <div className="flex flex-col gap-4">
    <div>Items: 20</div>
    <div className="flex flex-col gap-2">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={name}
        className="p-2 border-2 rounded-lg border-blue-950"
        disabled
      />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={description}
        className="p-2 border-2 rounded-lg border-blue-950"
        disabled
      />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="image">Image</label>
      <div className="relative">
        <Image src={image.src} alt={image.alt} width={200} height={200} />
      </div>
    </div>
  </div>
);
