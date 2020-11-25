import React, { useState, useEffect, useCallback } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Circle, Text, Paragraph, Box, Button } from "@advisable/donut";
import { useParams } from "react-router";
import Loading from "components/Loading";
import PaymentMethod from "components/PaymentMethod";
import Loader from "components/Loader";
import PaymentMethodForm from "components/PaymentMethodForm";
import currency from "src/utilities/currency";
import {
  usePaymentDetails,
  useDepositStatus,
  usePublishProject,
} from "./queries";
import illustration from "./illustration.png";

function PaymentProcessing() {
  const { id } = useParams();
  useDepositStatus(id);

  return <Text mt="8">Please wait while we process your payment...</Text>;
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
      <Box mb="l">
        <Button size="s" variant="subtle" onClick={onNewCard}>
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
  // processing is set to true once the stripe requests have succeeded and we
  // are waiting for webhook to mark the deposit as paid.
  const [processing, setProcessing] = useState(false);

  const viewer = data.viewer;
  const paymentIntent = data.project.deposit.paymentIntent;
  const newCardForm = newCard || !viewer.paymentMethod;

  const handleExistingPaymentMethod = async () => {
    setProcessing(true);
    const { error } = await stripe.handleCardPayment(paymentIntent, {
      payment_method: viewer.paymentMethod.id,
    });

    if (error) {
      setProcessing(false);
    }
  };

  // Handler for PaymentMethodForm component card details. This is used to
  // complete the payment when the user does not have an existing payment
  // method.
  const handleCardDetails = async (stripe, details, formik) => {
    setProcessing(true);
    const { error } = await stripe.handleCardPayment(
      paymentIntent,
      details.card,
      {
        payment_method_data: {
          billing_details: {
            name: details.cardholder,
          },
        },
      },
    );

    if (error) {
      setProcessing(false);
      formik.setFieldError("card", error.message);
    }
  };

  return (
    <>
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
      {processing ? <PaymentProcessing /> : null}
    </>
  );
}

function PublishProject() {
  const { id } = useParams();
  const [publishProject] = usePublishProject();

  const handlePublish = useCallback(() => {
    publishProject({
      variables: {
        input: { id },
      },
    });
  }, [publishProject, id]);

  useEffect(() => {
    const timeout = setTimeout(handlePublish, 1000);
    return () => clearTimeout(timeout);
  }, [handlePublish]);

  return (
    <Box mx="auto" maxWidth="300px" textAlign="center">
      <img width="100%" src={illustration} alt="" />
      <Box mt="4" mb="5" display="flex" justifyContent="center">
        <Circle size="32px" bg="blue100">
          <Loader size="sm" color="blue900" />
        </Circle>
      </Box>
      <Text mb="2" fontSize="lg" fontWeight="medium" letterSpacing="-0.02rem">
        Publishing...
      </Text>
      <Text fontSize="sm" lineHeight="1.2rem">
        Please wait while we publish your project. This should only take a
        second.
      </Text>
    </Box>
  );
}

export default function Deposit({ data: { project } }) {
  const { data, loading, error } = usePaymentDetails(project.id);

  if (project.deposit.paid) {
    return <PublishProject />;
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
