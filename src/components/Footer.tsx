import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-white">
      <span>Minh Le © {new Date().getFullYear()}</span>
      <span>
        Visit{" "}
        <Link href="https://www.ledminh.dev">
          <span className="text-blue-400">ledminh.dev</span>
        </Link>{" "}
        for more info
      </span>
    </div>
  );
}
