import React, { useEffect } from "react";
import graphqlClient from "src/graphqlClient";
import CREATE_PAYMENT from "./createPayment.graphql";
import FETCH_PAYMENT from "./fetchPayment.graphql";

const PaymentPending = ({ source, mutate, match, history }) => {
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
          amount: 1000
        }
      }
    });

    const { payment, error } = response.data.createPayment;

    if (error) {
      history.replace(`/project_setup/${projectID}/deposit`);
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

  return <div>Processing payment...</div>;
};

export default PaymentPending;
