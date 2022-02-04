import React from "react";
import { Box } from "@advisable/donut";
import stripe from "./assets/stripe.svg";
import methods from "./assets/paymentMethods.png";

export default function PaymentMethods() {
  return (
    <Box color="neutral600">
      <Box as="img" src={methods} height="28px" marginRight={1} />
      <Box as="img" src={stripe} height="28px" opacity="0.4" />
    </Box>
  );
}
