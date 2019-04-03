import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import colors from "../../colors"

const Container = styled.ul``;

const Item = styled.li`
  display: flex;
  font-size: 13px;
  line-height: 18px;
  padding-top: 12px;
  align-items: center;
  padding-bottom: 12px;
  justify-content: space-between;
  border-bottom: 1px solid ${rgba(colors.neutral.s8, 0.1)};

  &:first-child { padding-top: 0 }
  &:last-child { padding-bottom: 0; border-bottom: none; }

  a {
    text-decoration: none;
    color: ${colors.blue.base};
  }
`;

const Label = styled.span`
  color: ${colors.neutral.s8};
  font-weight: 400;
  padding-right: 12px;
`;

const Value = styled.span`
  color: ${colors.neutral.s10};
  font-weight: 500;
  text-align: right;
`;

const AttributeList = ({ children }) => {
  return <Container>{children}</Container>;
};

const ListItem = ({ label, value }) => (
  <Item>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </Item>
);

AttributeList.Item = ListItem;

export default AttributeList;
