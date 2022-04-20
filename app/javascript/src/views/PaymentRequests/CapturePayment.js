import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { Text, Box, Stack, Tabs } from "@advisable/donut";
import PaymentMethodForm from "src/components/PaymentMethodForm";
import { ExclamationCircle } from "@styled-icons/heroicons-solid/ExclamationCircle";
import currency from "src/utilities/currency";
import DownloadInvoice from "./DownloadInvoice";

function Row({ children }) {
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      display={{ _: null, m: "flex" }}
    >
      {children}
    </Box>
  );
}

function Label({ children }) {
  return (
    <Box width="200px">
      <Text textTransform="uppercase" fontSize="12px" fontWeight={500}>
        {children}
      </Text>
    </Box>
  );
}

function Value({ children }) {
  return (
    <Box paddingTop={{ _: 0.5, m: null }}>
      <Text
        fontSize="sm"
        lineHeight="20px"
        color="neutral700"
        textAlign={{ _: null, m: "right" }}
      >
        {children}
      </Text>
    </Box>
  );
}

function BankTransferPending({ paymentRequest }) {
  const { payment } = paymentRequest;
  const total = currency(paymentRequest.amount + paymentRequest.adminFee, {
    format: "$0,0.00",
  });

  return (
    <>
      <Text lineHeight="24px" marginBottom={6} fontSize="lg">
        Please send the total amount of{" "}
        <Text as="span" fontWeight={560}>
          {total}
        </Text>{" "}
        via bank transfer using one of the options below.
      </Text>

      <Tabs label="bank transfer options">
        <Tabs.Tab title="Inside US">
          <Stack paddingTop={3} spacing={6} divider="neutral100">
            <Row>
              <Label>Account holder</Label>
              <Value>Advisable Hyper Mega Net Limited</Value>
            </Row>
            <Row>
              <Label>Account Number</Label>
              <Value>9600000000071942</Value>
            </Row>
            <Row>
              <Label>ACH & Wire Routing Number</Label>
              <Value>084009519</Value>
            </Row>
            <Row>
              <Label>Reference number</Label>
              <Value>{payment.id}</Value>
            </Row>
            <Row>
              <Label>Address</Label>
              <Value>19 W 24th Street, New York, 10010, United States</Value>
            </Row>
          </Stack>
        </Tabs.Tab>
        <Tabs.Tab title="Outside US">
          <Stack paddingTop={3} spacing={6} divider="neutral100">
            <Row>
              <Label>Account holder:</Label>
              <Value>Advisable Hyper Mega Net Limited</Value>
            </Row>
            <Row>
              <Label>Account number</Label>
              <Value>8310111553</Value>
            </Row>
            <Row>
              <Label>Bank code (SWIFT / BIC)</Label>
              <Value>CMFGUS33</Value>
            </Row>
            <Row>
              <Label>Reference number</Label>
              <Value>{payment.id}</Value>
            </Row>
            <Row>
              <Label>Address</Label>
              <Value>19 W 24th Street, New York, 10010, United States</Value>
            </Row>
          </Stack>
        </Tabs.Tab>
      </Tabs>

      <Box paddingTop={8}>
        <DownloadInvoice payment={payment} />
      </Box>
    </>
  );
}

function CaptureCardPayment({ paymentRequest }) {
  const { payment } = paymentRequest;
  const client = useApolloClient();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);

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

      client.cache.modify({
        id: client.cache.identify(paymentRequest),
        fields: {
          status() {
            return "paid";
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

export default function CapturePayment({ paymentRequest }) {
  const { payment } = paymentRequest;

  if (payment.paymentMethod === "Bank Transfer") {
    return <BankTransferPending paymentRequest={paymentRequest} />;
  }

  return <CaptureCardPayment paymentRequest={paymentRequest} />;
}
