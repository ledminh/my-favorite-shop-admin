import { ReactNode } from "react";
import Image from "next/image";
import { Category as CategoryType, WithID } from "@/types";

type CategoryTabProps = {
  category: WithID<CategoryType>;
  onEdit: () => void;
  onDelete: () => void;
};

const CategoryTab = ({ category, onEdit, onDelete }: CategoryTabProps) => {
  const { name, image } = category;

  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center"
        />
      </ImageWrapper>
      <div className="flex flex-col self-stretch justify-between flex-grow py-2 sm:flex-row sm:items-center sm:py-0 md:flex-col">
        <Content item={category} />
        <ButtonsWrapper>
          <Button
            onClick={onEdit}
            className="text-white bg-blue-950 hover:bg-blue-950/80 sm:h-full sm:w-20"
          >
            EDIT
          </Button>
          <Button
            onClick={onDelete}
            className="text-white bg-red-950 hover:bg-red-950/80 sm:h-full sm:w-20"
          >
            DELETE
          </Button>
        </ButtonsWrapper>
      </div>
    </Wrapper>
  );
};

export default CategoryTab;

/************************
 * Styles
 */

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-between gap-4 md:basis-[49%] md:flex-col">
    {children}
  </div>
);

const ImageWrapper = ({ children }: { children: ReactNode }) => (
  <div className="relative h-20 basis-20 md:h-96 md:w-full">{children}</div>
);

const ButtonsWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-start gap-2 sm:gap-0 sm:self-stretch">
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
};

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`px-2 py-1 text-sm ${className}`}>
      {children}
    </button>
  );
};

type ContentProps = {
  item: CategoryType;
};
const Content = ({ item }: ContentProps) => (
  <h2 className="text-lg font-semibold">{item.name}</h2>
);
