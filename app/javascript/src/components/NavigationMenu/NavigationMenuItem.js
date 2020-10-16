import { StyledNavigationMenuItem, ArrowIcon, PrefixIcon } from "./styles";

const NavigationMenuItem = ({ children, icon, ...props }) => {
  return (
    <StyledNavigationMenuItem {...props}>
      <PrefixIcon>{icon && icon}</PrefixIcon>
      {children}
      <ArrowIcon />
    </StyledNavigationMenuItem>
  );
};

export default NavigationMenuItem;
