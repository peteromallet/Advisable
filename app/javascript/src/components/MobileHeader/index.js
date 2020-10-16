import logo from "./logo.svg";
import Hamburger from "./Hamburger";
import { Header, Logo } from "./styles";

export default function MobileHeader({ onOpenNavigation, drawerOpen }) {
  return (
    <Header drawerOpen={drawerOpen}>
      <Hamburger onClick={onOpenNavigation} />
      <Logo src={logo} />
    </Header>
  );
}
