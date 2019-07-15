import React from "react";
import { get } from "lodash";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Text } from "@advisable/donut";
import Loading from "../../../components/Loading";
import PaymentMethodForm from "../../../components/PaymentMethodForm";

const GET_SETUP_INTENT = gql`
  query setupIntent {
    viewer {
      ... on User {
        id
        paymentMethodSetupIntent {
          secret
        }
      }
    }
  }
`;

const NewCardDetails = ({ data, onSuccess }) => {
  if (data.loading) return <Loading />;
  const secret = get(data, "viewer.paymentMethodSetupIntent.secret");

  const handleCardDetails = async (stripe, details, formik) => {
    const { setupIntent, error } = await stripe.handleCardSetup(
      secret,
      details.card,
      {
        payment_method_data: {
          billing_details: { name: details.cardholder },
        },
      }
    );

    if (error) {
      formik.setStatus(error.message);
    } else {
      onSuccess(setupIntent);
    }
  };

  return (
    <>
      <Text pb="xs" size="xl" lineHeight="s" color="blue.8" weight="medium">
        Payment Details
      </Text>
      <Text size="xs" color="neutral.5" lineHeight="xs" mb="l">
        Please provide your payment details below
      </Text>
      <PaymentMethodForm handleCardDetails={handleCardDetails} />
    </>
  );
};

export default graphql(GET_SETUP_INTENT)(NewCardDetails);
