import React from "react";
import styled from "styled-components";

const Container = styled.ul``;

const Item = styled.li`
  display: flex;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 12px;
  justify-content: space-between;
  &:last-child { margin-bottom: 0 }
`;

const Label = styled.span`
  color: #0e173a;
  font-weight: 500;
  padding-right: 12px;
`;

const Value = styled.span`
  color: #43506e;
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
