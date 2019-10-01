import React from "react";
import {
  StyledNumberedList,
  StyledNumberedListItem,
  StyledNumberedListItemNumber,
} from "./styles";

const NumberedList = ({ children, ...props }) => {
  const items = React.Children.map(children, (child, i) => {
    if (typeof child === "string") return child;
    return React.cloneElement(child, { number: i + 1 });
  });

  return <StyledNumberedList {...props}>{items}</StyledNumberedList>;
};

const NumberedListItem = ({ children, number, ...props }) => (
  <StyledNumberedListItem {...props}>
    <StyledNumberedListItemNumber>{number}.</StyledNumberedListItemNumber>
    {children}
  </StyledNumberedListItem>
);

NumberedList.Item = NumberedListItem;

export default NumberedList;
