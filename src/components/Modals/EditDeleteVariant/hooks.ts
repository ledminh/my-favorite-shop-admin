import { CategoryResponse, Variant as VariantType, WithID } from "@/types";

import { OnSubmitProps } from "@/components/modals/Variant/types";

export default function useNewVariantModal() {
  const onAdd = (dataToAdd: OnSubmitProps): Promise<{ data: OnSubmitProps }> =>
    new Promise((resolve, _) => resolve({ data: dataToAdd }));

  const submitButton = {
    text: "Add",
    className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onAdd,
  };
}
