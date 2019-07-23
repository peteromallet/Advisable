import * as React from "react";
import Icon from "../Icon";
import { NavigationMenuItem as Container } from "./styles";

interface Props {
  to: string;
  icon?: string;
  children: React.ReactNode;
}

const NavigationMenuItem = ({ children, icon, ...props }: Props) => {
  return (
    <Container {...props}>
      {icon && <Icon icon={icon} height={20} strokeWidth={2} />}
      {children}
    </Container>
  );
};

export default NavigationMenuItem;
