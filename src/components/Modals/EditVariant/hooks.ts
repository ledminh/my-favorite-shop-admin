import { OnSubmitProps } from "@/components/modals/Variant/types";

export default function useEditVariantModal() {
  const onEdit = (data: OnSubmitProps): Promise<{ data: OnSubmitProps }> =>
    new Promise((resolve, _) => resolve({ data }));

  const submitButton = {
    text: "Save",
    className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onEdit,
  };
}
