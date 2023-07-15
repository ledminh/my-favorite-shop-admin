import type { WithID, Category as CategoryType } from "@/types";

type Props = {
  categories: WithID<CategoryType>[];
};

export default function ChangeCategoryButton({ categories }: Props) {
  return (
    <>
      <button className="p-1 text-white bg-blue-900 border border-black hover:bg-blue-950">
        Change
      </button>
    </>
  );
}
