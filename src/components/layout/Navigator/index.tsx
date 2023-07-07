import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import HorizontalMenu from "./HorizontalMenu";

export default function Navigator() {
  return (
    <>
      <div className="sm:hidden">
        <DropdownMenu navItems={NavItems} />
      </div>
      <div className="hidden sm:block">
        <HorizontalMenu navItems={NavItems} />
      </div>
    </>
  );
}

/****************************
 * Data
 */

const NavItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Categories",
    href: "/categories",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Customer Messages",
    href: "/messages",
  },
];
