import React, { Fragment, useEffect } from "react";
import Loading from 'src/components/Loading';
import graphqlClient from "src/graphqlClient";
import CREATE_PAYMENT from "./createPayment.graphql";
import FETCH_PAYMENT from "./fetchPayment.graphql";

const PaymentPending = ({ source, project, match, history, setError }) => {
  let pollingTimer;
  const { projectID } = match.params;

  const checkPayment = payment => {
    if (payment.status === "captured") {
      clearInterval(pollingTimer)
      history.replace(`/project_setup/${projectID}/confirm`)
    }

    if (payment.status === "failed") {
      clearInterval(pollingTimer)
      history.replace(`/project_setup/${projectID}/deposit`);
    }
  };

  useEffect(async () => {
    // Submit the source to create a payment record
    const response = await graphqlClient.mutate({
      mutation: CREATE_PAYMENT,
      variables: {
        input: {
          source: source,
          projectId: projectID,
          amount: project.depositOwed
        }
      }
    });

    const { payment, errors } = response.data.createPayment;

    if (errors) {
      setError(errors[0].code)
      return history.replace(`/project_setup/${projectID}/deposit`);
    }

    checkPayment(payment);

    if (payment.status === "pending") {
      pollingTimer = setInterval(async () => {
        const paymentResponse = await graphqlClient.query({
          query: FETCH_PAYMENT,
          fetchPolicy: "network-only",
          variables: { id: payment.id }
        });

        checkPayment(paymentResponse.data.payment);
      }, 1000);
    }
  }, []);

  return (
    <Fragment>
      <Loading />
    </Fragment>
  )
};

export default PaymentPending;
