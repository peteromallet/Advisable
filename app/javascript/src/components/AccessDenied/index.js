import React from "react";
import { Key } from "@styled-icons/feather";
import { Box, Text, Circle } from "@advisable/donut";

const AccessDenied = ({ heading, children }) => (
  <Box maxWidth={320} mx="auto" my="xxl" textAlign="center">
    <Circle size={60} color="white.9" bg="blue800" mb="l">
      <Key size={24} strokeWidth={2} />
    </Circle>
    <Text fontWeight="medium" mb="xxs">
      {heading || "Access Denied"}
    </Text>
    <Text fontSize="s" lineHeight="s" color="neutral.7">
      {children ||
        "It looks like you don't have access to the page you are trying to view."}
    </Text>
  </Box>
);

export default AccessDenied;
