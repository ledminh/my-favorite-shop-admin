import { Category as CategoryType, WithID } from "@/types";
import useDeleteCategoryModal from "./hooks";

import Modal from "@/components/layout/Modal";

import Image from "next/image";

type Props = {
  item: WithID<CategoryType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DeleteCategoryModal = ({ item, isOpen, setIsOpen }: Props) => {
  const { onDelete, name, description, image } = useDeleteCategoryModal(item);

  const additionalButtons = [
    {
      text: "Delete",
      className: "text-blue-950 bg-white hover:bg-gray-200 active:bg-gray-300",
      onClick: onDelete,
    },
  ];

  return (
    <Modal
      type="attention"
      size="sm"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="DELETE CATEGORY"
      additionalButtons={additionalButtons}
    >
      <h3>Do you want to delete this category?</h3>
      <CategoryDetails name={name} description={description} image={image} />
    </Modal>
  );
};

export default DeleteCategoryModal;

/**************************
 * Components
 */
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
