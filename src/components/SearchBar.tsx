"use client";

import { KeyboardEvent, useState } from "react";

type Props = {
  onSearch: (searchTerm: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm !== "") {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <input
      type="text"
      name="search"
      id="search"
      value={searchTerm}
      onKeyDown={onKeyDown}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search ..."
      className="w-full p-2 text-gray-600 bg-gray-100 rounded-md ring-1 ring-gray-600 focus:outline-none focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100"
    />
  );
}
