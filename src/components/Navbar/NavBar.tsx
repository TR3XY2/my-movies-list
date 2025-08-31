import { ReactNode } from "react";

type NavBarProps = {
  children: ReactNode;
};

export function NavBar({ children }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img" aria-label="popcorn">
        🍿
      </span>
      <h1>MyMovieList</h1>
    </div>
  );
}
