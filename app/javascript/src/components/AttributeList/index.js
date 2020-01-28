import React from "react";
import styled from "styled-components";
import { theme } from "@advisable/donut";
import colors from "../../colors";

const Container = styled.ul``;

const Item = styled.li`
  font-size: 14px;
  padding: 14px 0;
  margin-top: -1px;
  line-height: 18px;
  position: relative;
  border-top: 1px solid ${colors.neutral.s2};
  border-bottom: 1px solid ${colors.neutral.s2};

  a {
    text-decoration: none;
    color: ${colors.blue.base};
  }
`;

const Label = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 500;
  padding-right: 12px;
  letter-spacing: -0.01em;
  color: ${theme.colors.neutral[7]};
`;

const Value = styled.div`
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: ${theme.colors.neutral[9]};
`;

const Action = styled.div`
  top: 20px;
  right: 0;
  position: absolute;
`;

const AttributeList = ({ children }) => {
  return <Container>{children}</Container>;
};

const ListItem = ({ label, value, action, children }) => (
  <Item>
    <Label>{label}</Label>
    <Action>{action}</Action>
    <Value>{value}</Value>
    <Value>{children}</Value>
  </Item>
);

AttributeList.Item = ListItem;

export default AttributeList;
