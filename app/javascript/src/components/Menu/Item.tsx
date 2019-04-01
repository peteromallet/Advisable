import * as React from "react";
import Icon from "../Icon";
import { Item } from "./styles";

export default ({ icon, children }) => {
  return (
    <Item>
      {icon && <Icon icon={icon} height={16} strokeWidth={1} />}
      {children}
    </Item>
  );
};
