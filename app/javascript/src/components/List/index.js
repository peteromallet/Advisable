import React from "react";
import { StyledList, StyledListItem } from "./styles";

const List = ({ children, ...props }) => {
  return <StyledList {...props}>{children}</StyledList>;
};

List.Item = StyledListItem;

List.defaultProps = {
  color: "neutral800",
  lineHeight: "20px",
};

export default List;
