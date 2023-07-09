import { LogoutIcon } from "@/components/Icons";

export default function LogoutButton() {
  return (
    <button className="flex items-center justify-between w-32 gap-1 px-3 py-2 font-bold bg-red-200 border-white rounded-lg group hover:shadow-sm hover:shadow-gray-500 sm:flex-wrap sm:border-2 sm:bg-transparent sm:w-auto sm:hover:border-red-500">
      <LogoutIcon
        className="w-6 h-6 font-bold text-blue-600 group-hover:text-red-500 sm:basis-full sm:text-white"
        strokeWidth={3}
      />
      <span className="sm:w-full sm:hidden">LOG OUT</span>
    </button>
  );
}
