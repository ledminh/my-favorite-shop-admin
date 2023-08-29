import { Image as ImageType, Variant as VariantType } from "@/types";

import Image from "next/image";

import { Props } from "./types";

import useVariants from "./hooks";
import { OnSubmitProps } from "@/components/modals/Variant/types";
import isImageType from "@/utils/isImageType";

export default function Variants(props: Props) {
  const { variants, addNew, edit, remove } = useVariants(props);

  return (
    <Wrapper>
      <Title>Variant</Title>
      <List>
        <Item>
          {!props.disabled && <Button onClick={addNew}>Add new variant</Button>}
        </Item>
        {variants.map((variant) => (
          <Item>
            <VariantItem
              variant={variant}
              onClick={() => edit(variant)}
              remove={remove}
              disabled={props.disabled}
            />
          </Item>
        ))}
        {variants.length === 0 && (
          <Item>
            <div className="flex items-center justify-center w-full h-full p-4 text-lg text-gray-500">
              No variant
            </div>
          </Item>
        )}
      </List>
    </Wrapper>
  );
}

/****************************
 * Styles
 */
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">{children}</div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <div className="font-bold border-b-2 border-blue-950">{children}</div>
);

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex flex-wrap gap-2">{children}</ul>
);

const Item = ({ children }: { children: React.ReactNode }) => (
  <li className="self-stretch justify-self-stretch">{children}</li>
);

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className="p-4 border border-blue-950 hover:bg-gray-200 active:bg-gray-300"
    onClick={onClick}
  >
    {children}
  </button>
);

const VariantItem = ({
  variant,
  onClick,
  remove,
  disabled,
}: {
  variant: VariantType | OnSubmitProps;
  onClick: () => void;
  remove: (variant: VariantType | OnSubmitProps) => void;
  disabled?: boolean;
}) => (
  <button
    className="flex items-center justify-between h-full gap-2 pl-2 pr-1 border rounded-3xl border-blue-950 hover:bg-gray-200 active:bg-gray-300"
    onClick={onClick}
  >
    <div className="relative w-16 h-[80%] rounded-lg overflow-hidden">
      <Image
        src={
          isImageType(variant.image)
            ? variant.image.src
            : URL.createObjectURL(variant.image)
        }
        alt="variant image"
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div className="flex items-center self-stretch justify-center p-4">
      {variant.name}
    </div>
    {!disabled && <DeleteButton onClick={() => remove(variant)} />}
  </button>
);

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="p-4 bg-red-800 rounded-full hover:bg-red-700"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M2.929 2.929a1 1 0 011.414 0L10 8.586l5.657-5.657a1 1 0 111.414 1.414L11.414 10l5.657 5.657a1 1 0 01-1.414 1.414L10 11.414l-5.657 5.657a1 1 0 01-1.414-1.414L8.586 10 2.929 4.343a1 1 0 010-1.414z"
      />
    </svg>
  </button>
);
