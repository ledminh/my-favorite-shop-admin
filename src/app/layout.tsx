import "./globals.css";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Favorite Shop Admin",
  description: "My Favorite Shop Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={
            inter.className +
            " bg-gradient-to-b from-gray-500 via-black to-gray-500 min-h-screen min-w-[383px]"
          }
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
