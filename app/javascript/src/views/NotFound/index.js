import React from "react";
import { Box, Text } from "@advisable/donut";

const NotFound = ({ heading, children }) => (
  <Box maxWidth={320} mx="auto" my={10} textAlign="center">
    <Text
      mb={4}
      as="h1"
      fontSize={60}
      color="blue900"
      fontWeight="bold"
      letterSpacing="-0.05em"
    >
      404
    </Text>
    <Text fontWeight="medium" mb={1}>
      {heading || "Not Found"}
    </Text>
    <Text fontSize="s" lineHeight="s" color="neutral700">
      {children || "The page you were looking for could not be found"}
    </Text>
  </Box>
);

export const isNotFound = (graphqlError) => {
  const code = graphqlError?.graphQLErrors?.[0]?.extensions?.code;
  return code === "NOT_FOUND";
};

export default NotFound;
