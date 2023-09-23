"use client";

import Link from "next/link";
import { WithID } from "@/types";

import { useState, JSX } from "react";

type Props<T> = {
  items: WithID<T>[];
  ItemTab: (props: {
    item: T;
    setIsModalOpen: (isOpen: boolean) => void;
    setCurrentItem: (item: T) => void;
  }) => JSX.Element;
  ItemModal: (props: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    afterDelete: () => void;
    afterUpdate: () => void;
    initItem: T;
  }) => JSX.Element;

  title: string;
  button: {
    link: string;
    text: string;
  };

  afterDelete: () => void;
  afterUpdate: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

export default function Card<T>({
  items,
  ItemTab,
  ItemModal,
  title,
  button,
  afterDelete,
  afterUpdate,
  onRefresh,
  isRefreshing,
}: Props<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<T | null>(null);

  return (
    <>
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
                <ItemTab
                  item={item}
                  setIsModalOpen={setIsModalOpen}
                  setCurrentItem={setCurrentItem}
                />
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
          <RefreshButton onClick={onRefresh} isRefreshing={isRefreshing} />
        </Footer>
      </Wrapper>

      {currentItem && (
        <ItemModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          initItem={currentItem}
          afterDelete={afterDelete}
          afterUpdate={afterUpdate}
        />
      )}
    </>
  );
}

/**********************
 * Styles
 */
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden border-4 rounded-lg border-blue-950 min-w-[370px]">
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
  <div className="flex justify-end gap-2 p-2 bg-blue-950/80">{children}</div>
);

const RefreshButton = (props: {
  onClick: () => void;
  isRefreshing: boolean;
}) => (
  <button
    className="flex items-center justify-center gap-2 p-2 font-bold text-white border-2 rounded-lg border-white/80 bg-blue-950/40 hover:bg-blue-950"
    onClick={props.onClick}
  >
    <span>REFRESH</span>
    <RefreshIcon isRefreshing={props.isRefreshing} />
  </button>
);

const RefreshIcon = (props: { isRefreshing: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`w-6 h-6 ${props.isRefreshing && "animate-[spin_2s]"}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);
