import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { Text, Box } from "@advisable/donut";
import PaymentMethodForm from "src/components/PaymentMethodForm";
import { ExclamationCircle } from "@styled-icons/heroicons-solid/ExclamationCircle";

export default function HandlePayment({ payment }) {
  const client = useApolloClient();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);

  // Handler for PaymentMethodForm component card details. This is used to
  // complete the payment when the user does not have an existing payment
  // method.
  const handleCardDetails = async (stripe, details) => {
    setProcessing(true);
    setError(null);

    const response = await stripe.confirmCardPayment(
      payment.paymentIntent.secret,
      {
        payment_method: {
          card: details.card,
          billing_details: {
            name: details.cardholder,
          },
        },
      },
    );

    setProcessing(false);

    if (response.error) {
      setError(response.error.message);
    } else {
      setError(null);
      client.cache.modify({
        id: client.cache.identify(payment),
        fields: {
          status() {
            return "succeeded";
          },
        },
      });
    }
  };
  return (
    <>
      <PaymentMethodForm
        loading={processing}
        buttonLabel="Complete Payment"
        handleCardDetails={handleCardDetails}
      />
      {error ? (
        <Box
          display="flex"
          alignItems="center"
          bg="red100"
          padding={4}
          marginTop={6}
          borderRadius="12px"
        >
          <Box color="red800" mr={2}>
            <ExclamationCircle size={24} />
          </Box>
          <Text color="red800">{error}</Text>
        </Box>
      ) : null}
    </>
  );
}
