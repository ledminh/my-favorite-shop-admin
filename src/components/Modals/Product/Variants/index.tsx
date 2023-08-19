import { Image as ImageType, Variant as VariantType } from "@/types";

import Image from "next/image";

import { Props } from "./types";

import useVariants from "./hooks";
import { OnSubmitProps } from "@/components/modals/Variant/types";
import isImageType from "@/utils/isImageType";

export default function Variants(props: Props) {
  const { variants, addNew, edit } = useVariants(props);

  return (
    <Wrapper>
      <Title>Variant</Title>
      <List>
        <Item>
          <Button onClick={addNew}>Add new variant</Button>
        </Item>
        {variants.map((variant) => (
          <Item>
            <VariantItem variant={variant} onClick={() => edit(variant)} />
          </Item>
        ))}
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
}: {
  variant: VariantType | OnSubmitProps;
  onClick: () => void;
}) => (
  <button
    className="flex items-center justify-between h-full gap-2 border border-blue-950 hover:bg-gray-200 active:bg-gray-300"
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
  </button>
);
