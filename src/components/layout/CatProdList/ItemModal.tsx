"use client";

import { FC } from "react";
import ModalLg from "@/components/layout/ModalLg";

type Props<T> = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: T;
  ModalContent: FC<{ item: T }>;
  title: string;
};

export default function ItemModal<T>({
  isOpen,
  setIsOpen,
  item,
  ModalContent,
  title,
}: Props<T>) {
  return (
    <ModalLg isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
      <ModalContent item={item} />
    </ModalLg>
  );
}
