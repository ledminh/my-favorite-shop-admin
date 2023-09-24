import { useEffect, useState } from "react";

import { Image as ImageType } from "@/types";

import { Props } from "./";

export default function useCategoryModal(props: Props) {
  /***********************
   * PRIVATE
   */

  // States
  const {
    initName,
    initDescription,
    initImage,
    submitButton,
    setLoading,
    onSubmit,
    afterSubmit,
  } = props;

  const [name, setName] = useState(initName ?? "");
  const [description, setDescription] = useState(initDescription ?? "");
  const [image, setImage] = useState<File | ImageType | null>(
    initImage ?? null
  );

  useEffect(() => {
    setName(initName ?? "");
    setDescription(initDescription ?? "");
    setImage(initImage ?? null);
  }, [initName, initDescription, initImage]);

  // Functions

  const reset = () => {
    setName("");
    setDescription("");
    setImage(null);
  };

  const _onSubmit = () => {
    setLoading(true);
    onSubmit({
      name,
      description,
      image: image as File | ImageType,
    })
      .then(({ data: category }) => {
        if (category) {
          afterSubmit(category);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

    reset();
  };

  const isDisabled = () => {
    return name === "" || description === "" || !image;
  };

  /***********************
   * PUBLIC
   */

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const additionalButtons: {
    text: string;
    className: string;
    disabledClassName?: string;
    onClick: () => void;
    disabled?: boolean;
  }[] = [
    {
      ...submitButton,
      disabled: isDisabled(),
      onClick: _onSubmit,
    },
  ];

  return {
    image,
    name,
    description,
    onNameChange,
    onDescriptionChange,
    onImageChange,
    additionalButtons,
  };
}
