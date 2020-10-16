import styled from "styled-components";
import { theme } from "@advisable/donut";

const Container = styled.ul``;

const Item = styled.li`
  font-size: 14px;
  padding: 16px 0;
  margin-top: -1px;
  line-height: 18px;
  position: relative;
  border-top: 1px solid ${theme.colors.neutral200};
  border-bottom: 1px solid ${theme.colors.neutral200};

  a {
    text-decoration: none;
    color: ${theme.colors.blue500};
  }
`;

const Label = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 500;
  padding-right: 12px;
  color: ${theme.colors.neutral600};
`;

const Value = styled.div`
  display: block;
  font-weight: 500;
  color: ${theme.colors.neutra900};
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
