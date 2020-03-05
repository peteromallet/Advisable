import React from "react";
import { Box, Text } from "@advisable/donut";

const NotFound = ({ heading, children }) => (
  <Box maxWidth={320} mx="auto" my="xxl" textAlign="center">
    <Text
      mb="m"
      as="h1"
      fontSize={60}
      color="blue.9"
      fontWeight="bold"
      letterSpacing="-0.05em"
    >
      404
    </Text>
    <Text fontWeight="medium" mb="xxs">
      {heading || "Not Found"}
    </Text>
    <Text fontSize="s" lineHeight="s" color="neutral.7">
      {children || "The page you were looking for could not be found"}
    </Text>
  </Box>
);

export const isNotFound = graphqlError => {
  const code = graphqlError?.graphQLErrors?.[0]?.extensions?.code;
  return code === "notFound";
};

export default NotFound;
