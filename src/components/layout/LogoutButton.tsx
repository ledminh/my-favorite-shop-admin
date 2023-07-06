import { LogoutIcon } from "@/components/Icons";

export default function LogoutButton() {
  return (
    <button className="flex gap-1 p-1 font-bold bg-red-200 rounded-lg group hover:shadow-sm hover:shadow-gray-500">
      <span>LOG OUT</span>
      <LogoutIcon
        className="w-6 h-6 font-bold text-blue-600 group-hover:text-red-500"
        strokeWidth={3}
      />
    </button>
  );
}
