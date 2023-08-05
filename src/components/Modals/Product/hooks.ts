import { Category as CategoryType, WithID } from "@/types";

import { useState } from "react";
import { Props } from "./";

export default function useProductModal({
  type,
  categories,
  submitButton,
  onSubmit,
  initSerial,
  initName,
  initPriceStr,
  initIntro,
  initDescription,
  initImages,
}: Props) {
  /******************
   * PRIVATE
   */

  const [categoryID, setCategoryID] = useState<string>(
    type === "add" ? categories[0].id : ""
  );
  const [serial, setSerial] = useState<string>(initSerial || "");
  const [name, setName] = useState<string>(initName || "");
  const [priceStr, setPriceStr] = useState<string>(initPriceStr || "");
  const [intro, setIntro] = useState<string>(initIntro || "");
  const [description, setDescription] = useState<string>(initDescription || "");

  const [images, setImages] = useState<File[]>(initImages || []);

  const reset = () => {
    setCategoryID(categories ? categories[0].id : "");
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

  const isDisabled = () => {
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
  const onSerialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serial = e.target.value;
    setSerial(serial);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let priceStr = e.target.value;

    // only allow number and decimal point
    const regex = /^[0-9.]*$/;
    if (!regex.test(priceStr)) {
      priceStr = priceStr.slice(0, -1);
    }

    setPriceStr(priceStr);
  };

  const onIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intro = e.target.value;
    setIntro(intro);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setDescription(description);
  };

  const additionalButtons = [
    {
      ...submitButton,
      disabled: isDisabled(),
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
    images,
    onCategoryChange,
    onSerialChange,
    onNameChange,
    onPriceChange,
    onIntroChange,
    onDescriptionChange,
    setImages,
    additionalButtons,
  };
}
