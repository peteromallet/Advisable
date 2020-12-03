import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import { rgba } from "polished";

export function SectionHeaderWrapper({ children, divider, ...props }) {
  return (
    <Box
      mb={3}
      display="flex"
      alignItems="center"
      pb={divider && "xs"}
      borderStyle="solid"
      borderBottomWidth={divider && "1px"}
      borderColor={divider}
      {...props}
    >
      {children}
    </Box>
  );
}

export function SectionHeaderText({ children, ...props }) {
  return (
    <Text
      as="h2"
      fontSize="xl"
      fontWeight="medium"
      lineHeight="29px"
      color={rgba(theme.colors.neutral600, 0.9)}
      {...props}
    >
      {children}
    </Text>
  );
}
