import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import PaymentMethod from "../../../../components/PaymentMethod";

const CardPaymentSettings = ({ paymentMethod, openCardModal }) => {
  return (
    <Box mb="l">
      {Boolean(paymentMethod) && (
        <>
          <Text
            mb="xxs"
            fontSize="l"
            color="neutral.7"
            fontWeight="semibold"
            letterSpacing="-0.01rem"
          >
            Card Details
          </Text>
          <Text fontSize="s" color="neutral.8" mb="s">
            This card will be charged in order to collect payment for
            freelancers.
          </Text>
          <PaymentMethod paymentMethod={paymentMethod} />
          <Button
            mt="xs"
            type="button"
            intent="success"
            appearance="minimal"
            onClick={openCardModal}
          >
            Update card details
          </Button>
        </>
      )}

      {!paymentMethod && (
        <>
          <Text
            mb="xxs"
            fontSize="l"
            color="neutral.7"
            fontWeight="semibold"
            letterSpacing="-0.01rem"
          >
            Card Details
          </Text>
          <Text fontSize="s" color="neutral.7" mb="s">
            You have not added any card details yet.
          </Text>
          <Button type="button" appearance="primary" onClick={openCardModal}>
            Add a card
          </Button>
        </>
      )}

      <Box height={1} bg="neutral.1" my="l" />
    </Box>
  );
};

export default CardPaymentSettings;
