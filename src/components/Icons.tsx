import { FC } from "react";

type IconType = FC<{ className?: string; strokeWidth?: number }>;

export const LogoutIcon: IconType = ({ className, strokeWidth }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth || 1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
    />
  </svg>
);
