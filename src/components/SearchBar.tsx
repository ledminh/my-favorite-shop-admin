export default function SearchBar() {
  return (
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Search ..."
      className="w-full p-2 text-gray-600 bg-gray-100 rounded-md ring-1 ring-gray-600 focus:outline-none focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100"
    />
  );
}
