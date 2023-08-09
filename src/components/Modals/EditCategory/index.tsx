import { Category as CategoryType, WithID } from "@/types";
import useEditCategoryModal from "./hooks";

import CategoryModal from "../Category";

type Props = {
  item: WithID<CategoryType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  afterEdit: (item: WithID<CategoryType>) => void;
};

const EditCategoryModal = ({ item, isOpen, setIsOpen, afterEdit }: Props) => {
  const { submitButton, onSave } = useEditCategoryModal(item);

  return (
    <CategoryModal
      type="edit"
      title="Edit Category"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitButton={submitButton}
      onSubmit={onSave}
      afterSubmit={afterEdit}
      initName={item.name}
      initDescription={item.description}
      initImage={item.image}
    />
  );
};

export default EditCategoryModal;
