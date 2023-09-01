import { Variant as VariantType, WithID } from "@/types";

type Props = {
  variants: WithID<VariantType>[];
};

const Variants = ({ variants }: Props) => {
  return (
    <>
      <div className="hidden md:block">
        <List variants={variants} />
      </div>
      <div className="md:hidden">
        <Text variants={variants} />
      </div>
    </>
  );
};

export default Variants;

/************************
 * Components
 */
const List = ({ variants }: Props) => {
  return (
    <ul className="px-4 py-1 overflow-y-scroll bg-gray-300 border-2 rounded-full border-blue-950 max-h-12">
      {variants.map((variant) => (
        <li
          key={variant.id}
          className="flex justify-between py-2 border-b border-b-blue-950"
        >
          <h3 className="text-sm font-semibold">{variant.name}</h3>
          <p className="text-sm font-semibold text-blue-900">
            <span>Price:</span> <span>${variant.price}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

const Text = ({ variants }: Props) => {
  let text = variants.map((variant: VariantType) => variant.name).join(", ");

  if (text.length > 20) {
    text = text.slice(0, 20) + "...";
  }

  return <p className="text-sm font-semibold text-blue-900">{text}</p>;
};
