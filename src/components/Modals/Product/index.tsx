import Select from "@/components/layout/Select";
import Modal from "../../layout/Modal";
import useProductModal from "./hooks";

import Promotion from "./Promotion";

import { Category, WithID } from "@/types";

import Image from "next/image";

export type OnSubmitProps = {
  id: string;
  categoryID: string;

  name: string;
  price: number;
  intro: string;
  description: string;
};

export type Props = (
  | {
      // Add New Product (user can choose category)
      type: "add";
      catName?: undefined;
      categories: WithID<Category>[];
    }
  | {
      // Edit Product (user cannot change category)
      type: "edit" | "delete";
      catName: string;
      categories?: undefined;
    }
) & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  submitButton: {
    text: string;
    className: string;
    disabledClassName: string;
  };
  onSubmit: (props: OnSubmitProps) => void;

  initSerial?: string;
  initName?: string;
  initPriceStr?: string;
  initIntro?: string;
  initDescription?: string;
  initImage?: File | null;
};

export default function ProductModal(props: Props) {
  const {
    categoryID,
    serial,
    name,
    priceStr,
    intro,
    description,
    image,
    onCategoryChange,
    onSerialChange,
    onNameChange,
    onPriceChange,
    onIntroChange,
    onDescriptionChange,
    setImage,
    additionalButtons,
  } = useProductModal(props);

  const { isOpen, setIsOpen, title, type, catName, categories } = props;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      additionalButtons={additionalButtons}
      title={title}
    >
      <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-scroll px-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          {type === "add" && (
            <Select
              id="category"
              options={categories.map((category) => ({
                id: category.id,
                text: category.name,
              }))}
              defaultValue={categories[0].id}
              value={categoryID}
              onChange={(id) => onCategoryChange(id)}
            />
          )}
          {type === "edit" && (
            <input
              type="text"
              name="category"
              id="category"
              value={catName}
              disabled
              className="p-2 bg-gray-300 border rounded-lg border-blue-950"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Serial #</label>
          <input
            type="text"
            name="serial"
            id="serial"
            value={serial}
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
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={priceStr}
            onChange={(e) => onPriceChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Intro</label>
          <input
            type="text"
            name="intro"
            id="intro"
            value={intro}
            onChange={(e) => onIntroChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="p-2 border-2 rounded-lg border-blue-950"
          />
        </div>
        <Promotion />
        <div className="flex flex-col gap-2">
          <span>Variant</span>
          <ul>
            <li>
              <button>Add new variant</button>
            </li>
            <li>
              <button>Variant 1</button>
            </li>
            <li>
              <button>Variant 2</button>
            </li>
            <li>
              <button>Variant 3</button>
            </li>
            <li>
              <button>Variant 4</button>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <label
            htmlFor="image"
            className="p-2 text-center bg-gray-300 border-2 border-black rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 shadow-black w-[150px] mx-auto active:bg-gray-300 active:shadow-none"
          >
            {image ? "Change Image" : "Add Image"}
          </label>
          <input
            hidden
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="flex justify-center">
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="category image"
              width={208}
              height={208}
              className="rounded-lg w-52 h-52"
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
