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
    <Wrapper>
      <Header>
        <h2 className="text-xl font-bold text-white/80">{title}</h2>
      </Header>
      <Body>
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-bold text-blue-950">
              No {title.toLowerCase()}
            </h3>
            <p className="text-sm text-center text-blue-950">
              You have no {title.toLowerCase()} at the moment.
            </p>
          </div>
        )}
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id} className="pb-4 border-b border-blue-950">
              <ItemTab item={item} />
            </li>
          ))}
        </ul>
      </Body>
      <Footer>
        <Link href={button.link}>
          <button className="p-2 font-bold text-white border-2 rounded-lg border-white/80 bg-blue-950/40 hover:bg-blue-950">
            {button.text}
          </button>
        </Link>
      </Footer>
    </Wrapper>
  );
}

/**********************
 * Styles
 */
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden border-4 rounded-lg border-blue-950">
    {children}
  </div>
);

const Header = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-b-4 bg-blue-950/80 border-blue-950">
    {children}
  </div>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 overflow-y-scroll bg-orange-100 h-96">{children}</div>
);

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end p-2 bg-blue-950/80">{children}</div>
);
