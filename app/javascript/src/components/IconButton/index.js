import React from "react";
import Icon from "../Icon";
import { IconButton as Wrapper } from "./styles";

const IconButton = ({ icon, ...props }) => {
  return (
    <Wrapper {...props}>
      <Icon icon={icon} />
    </Wrapper>
  )
}

export default IconButton