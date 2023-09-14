import { FC, ReactNode } from "react";
import Image from "next/image";
import { Category, WithID } from "@/types";

type ItemCardProps<T> = {
  item: WithID<T>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  getImage: (item: WithID<T>) => { src: string; alt: string };
  CardContent: FC<{ item: WithID<T> }>;
};

function ItemCard<T>({
  item,
  onEdit,
  onDelete,
  getImage,
  CardContent,
}: ItemCardProps<T>) {
  const image = getImage(item);

  const isDeleteButtonDisabled = () => {
    const _i = item as unknown as WithID<Category>;
    return _i.numProducts !== undefined && _i.numProducts > 0;
  };

  return (
    <ItemWrapper>
      <ImageWrapper>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 33vw"
          className="object-cover object-center"
        />
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
