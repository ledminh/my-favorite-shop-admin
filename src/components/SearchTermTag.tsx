import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const SearchTermTag = ({
  children,
  onClearSearch,
}: {
  children: ReactNode;
  onClearSearch: () => void;
}) => (
  <span className="inline-flex items-center overflow-hidden text-sm font-medium text-white bg-gray-700 rounded-md">
    <span className="inline-block px-2 py-2 bg-red-950">Search Term</span>
    <span className="inline-block px-2 py-2">{children}</span>
    <span className="inline-block pr-1">
      <button
        className="inline-flex items-center justify-center w-6 h-6 text-white rounded-full focus:ring-1 focus:ring-gray-800 hover:bg-gray-950 focus:outline-none"
        onClick={onClearSearch}
      >
        <span className="sr-only">Remove search term</span>
        <XMarkIcon className="w-4 h-4" />
      </button>
    </span>
  </span>
);

export default SearchTermTag;
