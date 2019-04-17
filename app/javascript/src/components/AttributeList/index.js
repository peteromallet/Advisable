import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import colors from "../../colors"

const Container = styled.ul``;

const Item = styled.li`
  display: flex;
  font-size: 14px;
  padding: 16px 0;
  margin-top: -1px;
  line-height: 18px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${rgba(colors.neutral.s8, 0.1)};
  border-bottom: 1px solid ${rgba(colors.neutral.s8, 0.1)};

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
