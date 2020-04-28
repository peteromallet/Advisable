import * as React from "react";
import { Item } from "./styles";

export default ({ icon, children, onClick }) => {
  return (
    <Item role="menuitem" onClick={onClick}>
      {icon && icon}
      {children}
    </Item>
  );
};
