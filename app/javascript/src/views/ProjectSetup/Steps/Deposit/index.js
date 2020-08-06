import React from "react";
import { get } from "lodash-es";
import { Button } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import { useStripe } from "@stripe/react-stripe-js";
import currency from "../../../../utilities/currency";
import PaymentMethod from "../../../../components/PaymentMethod";
import PaymentMethodForm from "../../../../components/PaymentMethodForm";
import PaymentPending from "./PaymentPending";
import GET_PAYMENT_INTENT from "./getPaymentIntent";
import { Total, Label, Amount } from "./styles";

const Deposit = ({ project, history }) => {
  const stripe = useStripe();
  const query = useQuery(GET_PAYMENT_INTENT, {
    variables: {
      id: project.airtableId,
    },
  });
  const [useNewCard, setUseNewCard] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  if (project.acceptedTerms === false) {
    return <Redirect to="terms" />;
  }

  const handleSuccess = () => {
    let projectId = project.airtableId;
    history.replace(`/project_setup/${projectId}/confirm`);
  };

  let paymentMethod = get(query.data, "viewer.paymentMethod");

  if (query.loading) return <>loading...</>;

  if (pending) {
    return <PaymentPending onSuccess={handleSuccess} id={project.airtableId} />;
  }

  const handleExistingPaymentMethod = async () => {
    setLoading(true);
    const { error } = await stripe.handleCardPayment(
      query.data.project.depositPaymentIntent.secret,
      {
        payment_method: paymentMethod.id,
      },
    );

    if (error) {
      setLoading(false);
    } else {
      setPending(true);
    }
  };

  // Handler for PaymentMethodForm component card details. This is used to
  // complete the payment when the user does not have an existing payment
  // method.
  const handleCardDetails = async (stripe, details, formik) => {
    const { error } = await stripe.handleCardPayment(
      query.data.project.depositPaymentIntent.secret,
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
      formik.setStatus(error.message);
    } else {
      setPending(true);
    }
  };

  let paymentInfo =
    useNewCard || Boolean(paymentMethod) === false ? (
      <PaymentMethodForm
        buttonLabel="Complete Setup"
        userId={query.data.project.user.id}
        handleCardDetails={handleCardDetails}
      />
    ) : (
      <>
        <Box mb="xs">
          <PaymentMethod paymentMethod={paymentMethod} />
        </Box>
        <Box mb="l">
          <Button size="s" variant="subtle" onClick={() => setUseNewCard(true)}>
            Update payment method
          </Button>
        </Box>
        <Button
          size="l"
          loading={loading}
          onClick={handleExistingPaymentMethod}
        >
          Complete Setup
        </Button>
      </>
    );

  return (
    <>
      <Text size="s" lineHeight="s" color="neutral.6">
        In order to begin recruitment on a project, we ask for a security
        deposit. This deposit is fully-refundable if you choose not to go ahead
        with the project and deductible from your first payment to the
        freelancer if you do go ahead with it.
      </Text>
      <Total>
        <Amount>{currency(query.data.project.depositOwed)}</Amount>
        <Label>Deposit</Label>
      </Total>
      {paymentInfo}
    </>
  );
};

export default Deposit;
