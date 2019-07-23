import React from "react";
import { Text, Box, Button } from "@advisable/donut";
import PaymentMethod from "../../../components/PaymentMethod";

const ExistingCardDeatils = ({
  onContinue,
  onUseDifferentCard,
  paymentMethod,
}) => {
  return (
    <>
      <Text pb="xs" size="xl" lineHeight="s" color="blue.8" weight="medium">
        Payment Details
      </Text>
      <Text size="xs" color="neutral.5" lineHeight="xs" mb="l">
        Would you like to use your existing card details or add a new card?
      </Text>
      <Box mb="l">
        <PaymentMethod paymentMethod={paymentMethod} />
      </Box>
      <Button width="100%" mb="xs" onClick={onUseDifferentCard}>
        Add a new card
      </Button>
      <Button
        width="100%"
        intent="success"
        appearance="primary"
        onClick={onContinue}
      >
        Continue with this card
      </Button>
    </>
  );
};

export default ExistingCardDeatils;
