import { OnSubmitProps } from "../Product";

export default function useEditProductModal() {
  const onSubmit = (props: OnSubmitProps) => {
    console.log(props);
  };

  const submitButton = {
    text: "Save",
    className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onSubmit,
  };
}
