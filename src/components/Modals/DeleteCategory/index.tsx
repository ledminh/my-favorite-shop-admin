import { Category as CategoryType, WithID } from "@/types";
import useDeleteCategoryModal from "./hooks";

import ModalLg from "@/components/layout/ModalLg";

type Props = {
  item: WithID<CategoryType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DeleteCategoryModal = ({ item, isOpen, setIsOpen }: Props) => {
  const { onDelete, name, description } = useDeleteCategoryModal(item);

  const additionalButtons = [
    {
      text: "Delete",
      className: "text-blue-950 bg-white hover:bg-gray-200 active:bg-gray-300",
      onClick: onDelete,
    },
  ];

  return (
    <ModalLg
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="DELETE CATEGORY"
      additionalButtons={additionalButtons}
    >
      <div>DO YOU WANT TO DELETE category {name}?</div>
      <div>{description}</div>
    </ModalLg>
  );
};

export default DeleteCategoryModal;
