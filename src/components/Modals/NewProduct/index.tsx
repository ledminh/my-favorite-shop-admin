import Select from "@/components/layout/Select";
import ModalLg from "../../layout/ModalLg";
import useNewProductModal from "./hooks";

import { Category, WithID } from "@/types";
import { on } from "events";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: WithID<Category>[];
};
export default function NewProdModal({ isOpen, setIsOpen, categories }: Props) {
  const {
    onCategoryChange,
    onSerialChange,
    onNameChange,
    onPriceChange,
    onIntroChange,
    onDescriptionChange,
    onAdd,
  } = useNewProductModal();

  const additionalButtons = [
    {
      text: "ADD",
      className: "text-blue-950 bg-white hover:bg-gray-200",
      onClick: onAdd,
    },
  ];

  return (
    <ModalLg
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      additionalButtons={additionalButtons}
      title="ADD NEW PRODUCT"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <Select
            id="category"
            options={categories.map((category) => ({
              id: category.id,
              text: category.name,
            }))}
            defaultValue={categories[0].id}
            onChange={(id) => onCategoryChange(id)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Serial #</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => onSerialChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => onNameChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Price</label>
          <input
            type="number"
            name="name"
            id="name"
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Intro</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => onIntroChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div>
          <h3>Promotion</h3>
          <div>
            Discount{" "}
            <input
              type="number"
              name="discount"
              id="discount"
              className="p-2 border-2 rounded-lg border-blue-950"
            />
          </div>
          <div>
            Sale <input type="number" name="sale" id="sale" />
          </div>
        </div>
        <div>
          Variant
          <button>ADD NEW VARIANT</button>
          <div>Variants</div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
      </div>
    </ModalLg>
  );
}

/****************************
 * Components
 */
