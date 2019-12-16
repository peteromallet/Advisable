import React from "react";
import { Box, Text, Icon } from "@advisable/donut";

const AccessDenied = ({ heading, children }) => (
  <Box maxWidth={320} mx="auto" my="xxl" textAlign="center">
    <Icon icon="key" width={40} height={40} color="neutral.4" mb="m" />
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
