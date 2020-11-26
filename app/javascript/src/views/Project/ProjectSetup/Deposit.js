import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Redirect } from "react-router-dom";
import { Text, Paragraph, Box, Button } from "@advisable/donut";
import { useParams } from "react-router";
import Loading from "components/Loading";
import { useNotifications } from "src/components/Notifications";
import PaymentMethod from "components/PaymentMethod";
import PaymentMethodForm from "components/PaymentMethodForm";
import currency from "src/utilities/currency";
import { usePaymentDetails, useDepositStatus } from "./queries";
import poweredByStripe from "./stripe.png";

// We render this component when the user submits their payment information.
// This component uses the useDepositStatus hook which polls the project every
// 2 seconds waiting for it's status to be updated. This update is handelled
// inside of the webhook stripe sends to us. Once the status update's then
// apollos cache will update and the Routing inside of Project/index.js will
// rerender the correct route.
function PaymentProcessing() {
  const { id } = useParams();
  const { notify } = useNotifications();
  const { data } = useDepositStatus(id);

  useEffect(() => {
    if (data?.project.publishedAt) {
      notify("Your project has been published");
    }
  }, [notify, data?.project.publishedAt]);

  return <Text mt="8">Please wait while we process your payment...</Text>;
}

function PaymentError({ error }) {
  return (
    <Text color="red600" mt="8">
      {error}
    </Text>
  );
}

function ExistingPaymentMethod({
  loading,
  onSubmit,
  paymentMethod,
  onNewCard,
}) {
  return (
    <>
      <Box mb="4">
        <PaymentMethod paymentMethod={paymentMethod} />
      </Box>
      <Box mb="8">
        <Button size="xs" variant="subtle" onClick={onNewCard}>
          Update payment method
        </Button>
      </Box>
      <Button size="l" loading={loading} onClick={onSubmit}>
        Complete Setup
      </Button>
    </>
  );
}

function DepositPayment({ data }) {
  const stripe = useStripe();
  const [newCard, setNewCard] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState(null);
  // processing is set to true once the stripe requests are started and we
  // are waiting for webhook to mark the deposit as paid.
  const [processing, setProcessing] = useState(false);

  const viewer = data.viewer;
  const paymentIntent = data.project.deposit.paymentIntent;
  const newCardForm = newCard || !viewer.paymentMethod;

  const handleStripeResponse = (response) => {
    const { error } = response;

    if (error) {
      setProcessing(false);
      setPaymentError(error.message);
    }
  };

  const handleExistingPaymentMethod = async () => {
    setProcessing(true);
    setPaymentError(null);
    const response = await stripe.confirmCardPayment(paymentIntent, {
      payment_method: viewer.paymentMethod.id,
    });

    handleStripeResponse(response);
  };

  // Handler for PaymentMethodForm component card details. This is used to
  // complete the payment when the user does not have an existing payment
  // method.
  const handleCardDetails = async (stripe, details) => {
    setProcessing(true);
    setPaymentError(null);
    const response = await stripe.confirmCardPayment(paymentIntent, {
      payment_method: {
        card: details.card,
        billing_details: {
          name: details.cardholder,
        },
      },
    });

    handleStripeResponse(response);
  };

  return (
    <Box position="relative">
      {newCardForm ? (
        <PaymentMethodForm
          userId={viewer.id}
          loading={processing}
          buttonLabel="Pay Deposit"
          handleCardDetails={handleCardDetails}
        />
      ) : (
        <ExistingPaymentMethod
          loading={processing}
          onNewCard={() => setNewCard(true)}
          paymentMethod={viewer.paymentMethod}
          onSubmit={handleExistingPaymentMethod}
        />
      )}
      {paymentError ? <PaymentError error={paymentError} /> : null}
      {processing ? <PaymentProcessing /> : null}
      <Box position="absolute" bottom="0" right="0" opacity="0.3">
        <img width="150px" src={poweredByStripe} alt="Powered by stripe" />
      </Box>
    </Box>
  );
}

export default function Deposit({ data: { project } }) {
  const { id } = useParams();
  const { data, loading, error } = usePaymentDetails(project.id);

  if (data?.project.deposit.paid) {
    return <Redirect to={`/projects/${id}/setup/publish`} />;
  }

  return (
    <>
      <Text
        fontSize="4xl"
        marginBottom="2"
        fontWeight="medium"
        color="neutral900"
        letterSpacing="-0.02rem"
      >
        Publish Project
      </Text>
      <Text fontSize="l" lineHeight="22px">
        Thanks for confirming the details of this project! We’re ready to find
        you the perfect freelancer!
      </Text>
      <Box height="1px" bg="neutral100" marginY="6" />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="medium" letterSpacing="-0.02em">
          Security Deposit
        </Text>
        <Text fontSize="2xl" fontWeight="medium" letterSpacing="-0.02em">
          {currency(project.deposit.amount)}
        </Text>
      </Box>
      <Paragraph mt="2" mb="6" fontSize="sm">
        In order to begin recruitment on a project, we ask for a security
        deposit. This deposit is fully-refundable if you choose not to go ahead
        with the project and deductible from your first payment to the
        freelancer if you do go ahead with it.
      </Paragraph>

      {loading ? <Loading /> : null}

      {error ? (
        <Text color="red700">
          Failed to fetch payment information, please try to refresh the page
        </Text>
      ) : null}

      {!loading && data ? <DepositPayment data={data} /> : null}
    </>
  );
}
