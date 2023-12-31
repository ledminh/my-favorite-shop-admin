import { WithID } from "@/types";
import { OnSubmitProps } from "@/components/modals/Variant/types";

export default function useRemoveVariantModal() {
  const onRemove = (
    data: WithID<OnSubmitProps>
  ): Promise<{ data: WithID<OnSubmitProps> }> => Promise.resolve({ data });

  const submitButton = {
    text: "Remove",
    className: "bg-red-800 text-white hover:bg-red-800/80",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onRemove,
  };
}
