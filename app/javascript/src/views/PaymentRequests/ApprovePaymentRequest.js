import React from "react";
import { Box, Button, Text, Link } from "@advisable/donut";
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

  const bankTransfer = paymentRequest.company.paymentMethod === "Bank Transfer";

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

      <Box paddingTop={6}>
        {bankTransfer ? (
          <Text lineHeight="24px">
            Your account is setup to use bank tranfsers. After approving this
            request we will issue you an invoice with details on where to send
            the funds. Please{" "}
            <Link.External href="mailto:hello@advisable.com">
              contact us
            </Link.External>{" "}
            if you would like to switch from bank transfers to card payments.
          </Text>
        ) : (
          <Box color="neutral600">
            <Box as="img" src={methods} height="28px" marginRight={1} />
            <Box as="img" src={stripe} height="28px" opacity="0.4" />
          </Box>
        )}
      </Box>
    </>
  );
}
