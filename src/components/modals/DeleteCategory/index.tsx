import { Category as CategoryType, WithID } from "@/types";
import useDeleteCategoryModal from "./hooks";

import CategoryModal from "../Category";

import Image from "next/image";

type Props = {
  item: WithID<CategoryType>;
  isOpen: boolean;
  setLoading: (loading: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  afterDelete: (item: WithID<CategoryType>) => void;
};

const DeleteCategoryModal = ({
  item,
  isOpen,
  setLoading,
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
      setLoading={setLoading}
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
