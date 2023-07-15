import Filters from "@/components/Filters";
import Sorts from "@/components/Sorts";
import SearchBar from "@/components/SearchBar";

export default function ControlPanel() {
  return (
    <>
      <Filters />
      <Sorts />
      <SearchBar />
    </>
  );
}
