import React from "react";
import { Key } from "@styled-icons/feather/Key";
import { Box, Text, Circle } from "@advisable/donut";

const AccessDenied = ({ heading, children }) => (
  <Box maxWidth={320} mx="auto" my={10} textAlign="center">
    <Circle size={60} color="white" bg="blue800" mb={6}>
      <Key size={24} strokeWidth={2} />
    </Circle>
    <Text fontWeight="medium" mb={1}>
      {heading || "Access Denied"}
    </Text>
    <Text fontSize="s" lineHeight="s" color="neutral700">
      {children ||
        "It looks like you don't have access to the page you are trying to view."}
    </Text>
  </Box>
);

export function isAccessDenied(graphqlError) {
  const code = graphqlError?.graphQLErrors?.[0]?.extensions?.code;
  return code === "INVALID_PERMISSIONS";
}

export default AccessDenied;
