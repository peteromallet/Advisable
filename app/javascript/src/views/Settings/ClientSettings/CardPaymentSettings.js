import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import PaymentMethod from "../../../components/PaymentMethod";

const CardPaymentSettings = ({ paymentMethod, openCardModal }) => {
  return (
    <Box mb="l">
      {Boolean(paymentMethod) && (
        <>
          <Text size="s" weight="medium" color="neutral.8" mb="xxs">
            Card Details
          </Text>
          <Text size="xs" color="neutral.5" mb="s">
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

      {!Boolean(paymentMethod) && (
        <>
          <Text size="s" weight="medium" color="neutral.8" mb="xxs">
            Card Details
          </Text>
          <Text size="xs" color="neutral.5" mb="s">
            You have not added any card details yet.
          </Text>
          <Button type="button" intent="success" onClick={openCardModal}>
            Add a card
          </Button>
        </>
      )}
    </Box>
  );
};

export default CardPaymentSettings;
