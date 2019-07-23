import React from "react";
import { get } from "lodash";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import useStripe from "../../../../hooks/useStripe";
import currency from "../../../../utilities/currency";
import Button from "../../../../components/Button";
import PaymentMethod from "../../../../components/PaymentMethod";
import PaymentMethodForm from "../../../../components/PaymentMethodForm";
import PaymentPending from "./PaymentPending";
import GET_PAYMENT_INTENT from "./getPaymentIntent";
import { Total, Label, Amount } from "./styles";

const Deposit = ({ data, project, history }) => {
  let stripe = useStripe();
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

  let paymentMethod = get(data, "viewer.paymentMethod");

  if (data.loading) return <>loading...</>;

  if (pending) {
    return <PaymentPending onSuccess={handleSuccess} id={project.airtableId} />;
  }

  const handleExistingPaymentMethod = async () => {
    setLoading(true);
    const { error } = await stripe.handleCardPayment(
      data.project.depositPaymentIntent.secret,
      {
        payment_method: paymentMethod.id,
      }
    );

    setLoading(false);

    if (error) {
    } else {
      setPending(true);
    }
  };

  // Handler for PaymentMethodForm component card details. This is used to
  // complete the payment when the user does not have an existing payment
  // method.
  const handleCardDetails = async (stripe, details, formik) => {
    const { error } = await stripe.handleCardPayment(
      data.project.depositPaymentIntent.secret,
      details.card,
      {
        payment_method_data: {
          billing_details: {
            name: details.cardholder,
          },
        },
      }
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
        handleCardDetails={handleCardDetails}
      />
    ) : (
      <>
        <Box mb="xs">
          <PaymentMethod paymentMethod={paymentMethod} />
        </Box>
        <Box mb="l">
          <Button
            styling="plainSubtle"
            size="s"
            onClick={() => setUseNewCard(true)}
          >
            Update payment method
          </Button>
        </Box>
        <Button
          styling="primary"
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
        <Amount>{currency(data.project.depositOwed)}</Amount>
        <Label>Deposit</Label>
      </Total>
      {paymentInfo}
    </>
  );
};

export default graphql(GET_PAYMENT_INTENT, {
  options: props => ({
    variables: {
      id: props.project.airtableId,
    },
  }),
})(Deposit);
