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
      <main>{children}</main>
    </Wrapper>
  );
}

/***************************
 * Styles
 */
const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen sm:min-h-[calc(100vh-2rem)] mx-auto sm:mt-4 bg-gray-300 max-w-7xl sm:w-11/12 sm:rounded-lg">
      {children}
    </div>
  );
};

const Header: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      {children}
    </header>
  );
};
