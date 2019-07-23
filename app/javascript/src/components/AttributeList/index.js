import React from "react";
import styled from "styled-components";
import colors from "../../colors";

const Container = styled.ul``;

const Item = styled.li`
  font-size: 14px;
  padding: 16px 0;
  margin-top: -1px;
  line-height: 18px;
  border-top: 1px solid ${colors.neutral.s2};
  border-bottom: 1px solid ${colors.neutral.s2};

  a {
    text-decoration: none;
    color: ${colors.blue.base};
  }
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.span`
  color: ${colors.neutral.s8};
  font-weight: 500;
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

const ListItem = ({ label, value, children }) => (
  <Item>
    <Contents>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Contents>
    {children}
  </Item>
);

AttributeList.Item = ListItem;

export default AttributeList;
