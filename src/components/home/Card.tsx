import Link from "next/link";
import { WithID } from "@/types";

type Props<T> = {
  items: WithID<T>[];
  ItemTab: (props: { item: T }) => JSX.Element;
  title: string;
  button: {
    link: string;
    text: string;
  };
};

export default function Card<T>({ items, ItemTab, title, button }: Props<T>) {
  return (
    <div className="w-10/12 mx-auto mt-8 overflow-hidden border-4 rounded-lg border-blue-950">
      <h2 className="p-4 text-xl font-bold text-white bg-blue-900 border-b-4 border-blue-950">
        {title}
      </h2>
      <div className="p-4 overflow-y-scroll bg-orange-200 h-96">
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id} className="pb-4 border-b border-blue-950">
              <ItemTab item={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end p-2 bg-black">
        <Link href={button.link}>
          <button className="p-2 font-bold text-white rounded-lg bg-blue-700/70 hover:bg-blue-700">
            {button.text}
          </button>
        </Link>
      </div>
    </div>
  );
}
