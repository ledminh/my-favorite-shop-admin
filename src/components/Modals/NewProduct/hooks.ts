import { useState } from "react";

export default function useNewProductModal() {
  const [categoryID, setCategoryID] = useState<string>("");
  const [serial, setSerial] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [intro, setIntro] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onCategoryChange = (id: string) => {
    setCategoryID(id);
  };
  const onSerialChange = (serial: string) => {
    setSerial(serial);
  };
  const onNameChange = (name: string) => {
    setName(name);
  };

  const onPriceChange = (price: number) => {
    setPrice(price);
  };

  const onIntroChange = (intro: string) => {
    setIntro(intro);
  };

  const onDescriptionChange = (description: string) => {
    setDescription(description);
  };

  const onAdd = () => {
    console.log({
      categoryID,
      serial,
      name,
      price,
      intro,
      description,
    });
  };

  return {
    onCategoryChange,
    onSerialChange,
    onNameChange,
    onPriceChange,
    onIntroChange,
    onDescriptionChange,
    onAdd,
  };
}
