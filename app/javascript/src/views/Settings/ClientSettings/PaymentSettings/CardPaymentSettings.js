import React from "react";
import { Box, Text, RoundedButton } from "@advisable/donut";
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
          <RoundedButton
            mt="xs"
            type="button"
            variant="subtle"
            onClick={openCardModal}
          >
            Update card details
          </RoundedButton>
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
          <RoundedButton type="button" variant="dark" onClick={openCardModal}>
            Add a card
          </RoundedButton>
        </>
      )}

      <Box height={1} bg="neutral.1" my="l" />
    </Box>
  );
};

export default CardPaymentSettings;
