"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  navItems: { name: string; href: string }[];
};

export default function HorizontalMenu({ navItems }: Props) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-between gap-1">
      {navItems.map((item) => (
        <li>
          <Link
            key={item.name}
            href={item.href}
            className={`px-3 py-2 font-medium text-gray-400 border border-gray-400 rounded-md hover:text-white hover:border-white hover:shadow-sm hover:shadow-white ${
              isCurrent(pathname, item.href)
                ? "bg-gray-700 text-white border-white"
                : ""
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/*************************
 * Utils
 */

const isCurrent = (pathname: string, href: string) => pathname === href;
