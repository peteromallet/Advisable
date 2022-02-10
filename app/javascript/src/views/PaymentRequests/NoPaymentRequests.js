import React from "react";
import { Box, Text, theme } from "@advisable/donut";
import CreditCardIllustration from "src/illustrations/zest/creditCard";

export default function NoPaymentRequests({ children }) {
  return (
    <Box
      paddingY={12}
      maxWidth="400px"
      mx="auto"
      textAlign="center"
      lineHeight="24px"
    >
      <CreditCardIllustration
        width="200px"
        marginBottom={4}
        color={theme.colors.blue100}
      />
      <Text fontSize="lg" fontWeight={520} lineHeight="24px">
        No payment requests
      </Text>
      {children}
    </Box>
  );
}
