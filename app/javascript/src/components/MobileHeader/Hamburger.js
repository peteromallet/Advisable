import { Hamburger, HamburgerLine } from "./styles";

export default function MobileHeaderHamburger({ onClick }) {
  return (
    <Hamburger onClick={onClick}>
      <HamburgerLine />
      <HamburgerLine />
      <HamburgerLine />
    </Hamburger>
  );
}
