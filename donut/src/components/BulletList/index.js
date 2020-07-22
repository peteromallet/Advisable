import React from "react";
import { StyledBulletList, StyledBulletListItem } from "./styles";

const BulletList = ({ children, ...props }) => {
  return <StyledBulletList {...props}>{children}</StyledBulletList>;
};

const BulletListItem = ({ children, ...props }) => (
  <StyledBulletListItem {...props}>{children}</StyledBulletListItem>
);

BulletList.Item = BulletListItem;

export default BulletList;
