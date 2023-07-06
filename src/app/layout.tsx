import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your Favorite Shop Admin",
  description: "Your Favorite Shop Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
