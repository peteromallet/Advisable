import React from "react";
import { Box, Button } from "@advisable/donut";
import { useApprovePaymentRequest } from "./queries";
import stripe from "./assets/stripe.svg";
import methods from "./assets/paymentMethods.png";

export default function ApprovePaymentRequest({ paymentRequest }) {
  const [approve, { loading }] = useApprovePaymentRequest();

  const handleApprove = async () => {
    await approve({
      variables: {
        input: {
          paymentRequest: paymentRequest.id,
        },
      },
    });
  };

  return (
    <>
      <Button
        size="l"
        width="100%"
        variant="gradient"
        loading={loading}
        onClick={handleApprove}
      >
        Approve & Pay
      </Button>
      <Box color="neutral400" paddingTop={6}>
        <Box as="img" src={methods} height="28px" marginRight={1} />
        <Box as="img" src={stripe} height="28px" opacity="0.4" />
      </Box>
    </>
  );
}
