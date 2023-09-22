"use client";

import { FC, ReactNode } from "react";
import Image from "next/image";
import { Category, WithID } from "@/types";

import { useState, useEffect } from "react";

type ItemCardProps<T> = {
  isLoading: boolean;
  item: WithID<T>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  getImage: (item: WithID<T>) => { src: string; alt: string };
  CardContent: FC<{ item: WithID<T> }>;
};

function ItemCard<T>({
  isLoading,
  item: _item,
  onEdit,
  onDelete,
  getImage,
  CardContent,
}: ItemCardProps<T>) {
  const [item, setItem] = useState(_item);
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    setImage(getImage(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    setItem(_item);
  }, [_item]);

  const isDeleteButtonDisabled = () => {
    const _i = item as unknown as WithID<Category>;
    return _i.numProducts !== undefined && _i.numProducts > 0;
  };

  const Content = (
    <>
      <ImageWrapper>
        {
          // Show div as an image placeholder
          image === null ? (
            <div className="w-full h-full bg-neutral-200"></div>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 33vw"
              className="object-cover object-center"
            />
          )
        }
      </ImageWrapper>
      <div className="flex flex-col self-stretch justify-between flex-grow py-2 sm:flex-row sm:items-center sm:py-0 md:flex-col">
        <ContentWrapper>
          <CardContent item={item} />
        </ContentWrapper>
        <ButtonsWrapper>
          <Button
            onClick={() => onEdit(item.id)}
            className="text-white bg-blue-950 hover:bg-blue-950/80 sm:h-full sm:w-20"
          >
            EDIT
          </Button>
          <Button
            onClick={() => onDelete(item.id)}
            className="text-white bg-red-950 hover:bg-red-950/80 sm:h-full sm:w-20 disabled:bg-red-950/50 disabled:cursor-not-allowed"
            disabled={isDeleteButtonDisabled()}
          >
            DELETE
          </Button>
        </ButtonsWrapper>
      </div>
    </>
  );

  return (
    <ItemWrapper>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          {/* Show loading*/}
          <svg
            className="w-10 h-10 text-blue-950 animate-spin"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>

          {/* Show content */}
        </div>
      ) : (
        Content
      )}
    </ItemWrapper>
  );
}

export default ItemCard;

/************************
 * Styles
 */

const ItemWrapper = ({ children }: { children: ReactNode }) => (
  <div className="relative flex items-center justify-between gap-4 md:flex-col md:gap-2 md:h-[280px] bg-neutral-300">
    {children}
  </div>
);

const ImageWrapper = ({ children }: { children: ReactNode }) => (
  <div className="relative h-24 basis-20 md:w-full md:basis-1/2">
    {children}
  </div>
);

const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="md:p-2 md:w-full">{children}</div>
);

const ButtonsWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-start gap-2 sm:gap-0 sm:h-full md:h-auto md:w-full">
    {children}
  </div>
);

/**************************
 * Components
 */

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 text-sm md:basis-1/2 md:text-base md:py-3 ${className}`}
    >
      {children}
    </button>
  );
};
