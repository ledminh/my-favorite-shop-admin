import { Product as ProductType, WithID } from "@/types";
import useDeleteProductModal from "./hooks";

import ModalLg from "@/components/layout/ModalLg";

type Props = {
  item: WithID<ProductType>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DeleteProductModal = ({ item, isOpen, setIsOpen }: Props) => {
  // const { onDelete, name, description } = useDeleteProductModal(item);

  // const additionalButtons = [
  //   {
  //     text: "Delete",
  //     className: "text-blue-950 bg-white hover:bg-gray-200 active:bg-gray-300",
  //     onClick: onDelete,
  //   },
  // ];

  // return (
  //   <ModalLg
  //     isOpen={isOpen}
  //     setIsOpen={setIsOpen}
  //     title="DELETE CATEGORY"
  //     additionalButtons={additionalButtons}
  //   >
  //     <div>DO YOU WANT TO DELETE category {name}?</div>
  //     <div>{description}</div>
  //   </ModalLg>
  // );

  return <div>DELETE PRODUCT MODAL</div>;
};

export default DeleteProductModal;
