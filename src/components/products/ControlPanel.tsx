import Filters from "@/components/Filters";
import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

export default function ControlPanel() {
  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <Filters />
        </div>
        <div className="basis-full">
          <SearchBar />
        </div>
      </div>
      <div>
        <Sorts />
      </div>
    </>
  );
}
