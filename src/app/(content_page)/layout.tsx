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
        <div>
          <Logo />
        </div>
        <div>
          <LogoutButton />
        </div>
        <div>
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
  return <header className="bg-blue-950">{children}</header>;
};
