import * as React from "react";
import { NavigationMenuItem as Container } from "./styles";

interface Props {
  to: string;
  icon?: string;
  children: React.ReactNode;
}

const NavigationMenuItem = ({ children, icon, ...props }: Props) => {
  return (
    <Container {...props}>
      {icon && icon}
      {children}
    </Container>
  );
};

export default NavigationMenuItem;
