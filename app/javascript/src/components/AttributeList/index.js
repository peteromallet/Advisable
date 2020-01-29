import React from "react";
import styled from "styled-components";
import { Box, Text, theme } from "@advisable/donut";

const StyledAttributeList = styled.ul``;

const StyledAttributeListItem = styled.li`
  display: flex;
  padding: 12px 0;
  margin-top: -1px;
  min-height: 50px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid ${theme.colors.neutral[2]};
  border-bottom: 1px solid ${theme.colors.neutral[2]};

  &:first-child {
    border-top: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StyledAttributeListItemAction = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  outline: none;
  display: flex;
  appearance: none;
  margin-left: 8px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral[6]};
  background: ${theme.colors.neutral[2]};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${theme.colors.neutral[7]};
    background: ${theme.colors.neutral[3]};
  }
`;

const AttributeList = ({ children }) => {
  return <StyledAttributeList>{children}</StyledAttributeList>;
};

const ListItem = ({ label, value, actions, children }) => (
  <StyledAttributeListItem>
    <Box display="flex" alignItems="center">
      <Box>
        <Text fontSize="s" color="neutral.7" letterSpacing="-0.01em">
          {label}
        </Text>
      </Box>
      <Box flex={1} textAlign="right">
        <Text
          fontSize="s"
          color="blue.9"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          {value}
        </Text>
      </Box>
      <Box>{actions}</Box>
    </Box>
    {children}
  </StyledAttributeListItem>
);

AttributeList.Item = ListItem;
AttributeList.Action = StyledAttributeListItemAction;

export default AttributeList;
