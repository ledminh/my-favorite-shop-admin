import Filters from "@/components/Filters";
import Sorts from "@/components/Sorts";
import CategoryDropdown from "@/components/products/CategoryDropdown";
import SearchBar from "@/components/SearchBar";

export default function ControlPanel() {
  return (
    <>
      <div className="flex gap-2">
        <Filters />
        <CategoryDropdown />
      </div>
      <Sorts />
      <SearchBar />
    </>
  );
}
