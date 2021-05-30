import React from "react";
import { AlertCircle } from "@styled-icons/feather/AlertCircle";
import { Box, Text, Circle } from "@advisable/donut";

const GenericError = ({ heading, children }) => (
  <Box maxWidth={320} mx="auto" my={10} textAlign="center">
    <Circle size={60} color="white" bg="blue800" mb={6}>
      <AlertCircle size={24} strokeWidth={2} />
    </Circle>
    <Text fontWeight="medium" mb={1}>
      {heading || "Something went wrong"}
    </Text>
    <Text fontSize="s" lineHeight="s" color="neutral700">
      {children || "Please try refreshing the page."}
    </Text>
  </Box>
);

export default GenericError;
