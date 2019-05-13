import { withApollo } from "react-apollo";
import React, { Fragment, useEffect } from "react";
import Loading from "src/components/Loading";
import CREATE_PAYMENT from "./createPayment.graphql";
import FETCH_PAYMENT from "./fetchPayment.graphql";

const PaymentPending = ({
  source,
  project,
  match,
  history,
  setError,
  client,
}) => {
  let pollingTimer;
  const { projectID } = match.params;

  const checkPayment = payment => {
    if (payment.status === "captured") {
      clearInterval(pollingTimer);
      history.replace(`/project_setup/${projectID}/confirm`);
    }

    if (payment.status === "failed") {
      clearInterval(pollingTimer);
      history.replace(`/project_setup/${projectID}/deposit`);
    }
  };

  const processPayment = async () => {
    // Submit the source to create a payment record
    const response = await client.mutate({
      mutation: CREATE_PAYMENT,
      variables: {
        input: {
          source: source,
          projectId: projectID,
          amount: project.depositOwed,
        },
      },
    });

    const { payment, errors } = response.data.createPayment;

    if (errors || payment.status === "failed") {
      setError(
        "We had some difficulties processing your payment. Please try again."
      );
      return history.replace(`/project_setup/${projectID}/deposit`);
    }

    checkPayment(payment);

    if (payment.status === "pending") {
      pollingTimer = setInterval(async () => {
        const paymentResponse = await client.query({
          query: FETCH_PAYMENT,
          fetchPolicy: "network-only",
          variables: { id: payment.id },
        });

        checkPayment(paymentResponse.data.payment);
      }, 1000);
    }
  };

  useEffect(() => {
    processPayment();
  }, []);

  return (
    <Fragment>
      <Loading />
    </Fragment>
  );
};

export default withApollo(PaymentPending);
