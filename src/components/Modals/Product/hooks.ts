import { Category as CategoryType, WithID } from "@/types";

import { useState } from "react";
import { OnSubmitProps } from "./";

type Props = {
  categories: WithID<CategoryType>[];
  submitButton: {
    text: string;
    className: string;
    disabledClassName: string;
  };
  onSubmit: (props: OnSubmitProps) => void;
  initCatID?: string;
  initSerial?: string;
  initName?: string;
  initPriceStr?: string;
  initIntro?: string;
  initDescription?: string;
  initImage?: File | null;
};

export default function useProductModal({
  categories,
  submitButton,
  onSubmit,
  initCatID,
  initSerial,
  initName,
  initPriceStr,
  initIntro,
  initDescription,
  initImage,
}: Props) {
  /******************
   * PRIVATE
   */

  const [categoryID, setCategoryID] = useState<string>(
    initCatID || categories[0].id
  );
  const [serial, setSerial] = useState<string>(initSerial || "");
  const [name, setName] = useState<string>(initName || "");
  const [priceStr, setPriceStr] = useState<string>(initPriceStr || "");
  const [intro, setIntro] = useState<string>(initIntro || "");
  const [description, setDescription] = useState<string>(initDescription || "");

  const [image, setImage] = useState<File | null>(initImage || null);

  const reset = () => {
    setCategoryID(categories[0].id);
    setSerial("");
    setName("");
    setPriceStr("");
    setIntro("");
    setDescription("");
  };

  // For submit button
  const _onSubmit = () => {
    onSubmit({
      id: serial,
      categoryID,

      name,
      price: parseFloat(priceStr),
      intro,
      description,
    });

    reset();
  };

  const onDisabled = () => {
    return (
      serial === "" ||
      name === "" ||
      priceStr === "" ||
      intro === "" ||
      description === ""
    );
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

  const additionalButtons = [
    {
      ...submitButton,
      disabled: onDisabled(),
      onClick: _onSubmit,
    },
  ];

  return {
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
  };
}
