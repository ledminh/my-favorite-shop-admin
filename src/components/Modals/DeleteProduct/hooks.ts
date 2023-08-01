import { OnSubmitProps } from "../Product";

export default function useDeleteProductModal() {
  const onSubmit = (props: OnSubmitProps) => {
    console.log(props);
  };

  const submitButton = {
    text: "Delete",
    className: "bg-red-800 text-blue-950 hover:bg-red-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onSubmit,
  };
}
