import { Category as CategoryType, WithID } from "@/types";

import { useState } from "react";

type Props = {
  categories: WithID<CategoryType>[];
};

export default function useNewProductModal({ categories }: Props) {
  /******************
   * PRIVATE
   */
  const [categoryID, setCategoryID] = useState<string>(categories[0].id);
  const [serial, setSerial] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [priceStr, setPriceStr] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const reset = () => {
    setCategoryID(categories[0].id);
    setSerial("");
    setName("");
    setPriceStr("");
    setIntro("");
    setDescription("");
  };

  /******************
   * PUBLIC
   */
  const onCategoryChange = (id: string) => {
    setCategoryID(id);
  };
  const onSerialChange = (serial: string) => {
    setSerial(serial);
  };
  const onNameChange = (name: string) => {
    setName(name);
  };

  const onPriceChange = (priceStr: string) => {
    // only allow number and decimal point
    const regex = /^[0-9.]*$/;
    if (!regex.test(priceStr)) {
      priceStr = priceStr.slice(0, -1);
    }

    setPriceStr(priceStr);
  };

  const onIntroChange = (intro: string) => {
    setIntro(intro);
  };

  const onDescriptionChange = (description: string) => {
    setDescription(description);
  };

  const onAdd = () => {
    console.log({
      id: serial,
      categoryID,

      name,
      price: parseFloat(priceStr),
      intro,
      description,
    });

    reset();
  };

  const onAddDisabled = () => {
    return (
      serial === "" ||
      name === "" ||
      priceStr === "" ||
      intro === "" ||
      description === ""
    );
  };

  const additionalButtons = [
    {
      text: "Add",
      className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
      onClick: onAdd,
      disabled: onAddDisabled(),
      disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
  ];

  return {
    categoryID,
    serial,
    name,
    priceStr,
    intro,
    description,
    onCategoryChange,
    onSerialChange,
    onNameChange,
    onPriceChange,
    onIntroChange,
    onDescriptionChange,
    additionalButtons,
  };
}
