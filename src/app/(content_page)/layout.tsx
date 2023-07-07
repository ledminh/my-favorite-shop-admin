import Logo from "@/components/layout/Logo";
import LogoutButton from "@/components/layout/LogoutButton";
import Navigator from "@/components/layout/Navigator";
import { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Wrapper>
      <Header>
        <div className="flex justify-center basis-full sm:basis-3/5 sm:justify-start">
          <Logo />
        </div>
        <div className="flex items-center justify-end pr-1 basis-1/2 sm:basis-1/5">
          <LogoutButton />
        </div>
        <div className="flex items-center justify-start pl-1 basis-1/2">
          <Navigator />
        </div>
      </Header>
      <main className="flex-grow">{children}</main>
      <footer className="text-white bg-red-950">Footer</footer>
    </Wrapper>
  );
}

/***************************
 * Styles
 */
const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen mx-auto sm:w-11/12 max-w-7xl sm:py-4">
      <div className="shadow-lg shadow-black sm:rounded-md sm:overflow-hidden min-h-screen sm:min-h-[calc(100vh-2rem)] bg-gray-300 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

const Header: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className="flex flex-wrap justify-between py-6 gap-y-6 bg-blue-950 sm:px-4">
      {children}
    </header>
  );
};
