import React from "react";
import gql from "graphql-tag";
import { compose, withApollo, graphql } from "react-apollo";
import { Text } from "@advisable/donut";
import Loading from "../../../components/Loading";
import PaymentMethodForm from "../../../components/PaymentMethodForm";

const CREATE_SETUP_INTENT = gql`
  mutation setupIntent {
    createSetupIntent(input: {}) {
      secret
    }
  }
`;

const GET_SETUP_INTENT_STATUS = gql`
  query setupIntentStatus {
    viewer {
      ... on User {
        id
        setupIntentStatus
      }
    }
  }
`;

const NewCardDetails = ({ createSetupIntent, client, onSuccess }) => {
  let timer = React.useRef(null);
  let [secret, setSecret] = React.useState(null);

  React.useEffect(() => {
    createSetupIntent().then(r => {
      setSecret(r.data.createSetupIntent.secret);
    });
  }, []);

  if (!secret) {
    return <Loading />;
  }

  const pollStatus = async () => {
    return new Promise((resolve, reject) => {
      timer.current = setInterval(async () => {
        const r = await client.query({
          fetchPolicy: "network-only",
          query: GET_SETUP_INTENT_STATUS,
        });

        if (r.data.viewer.setupIntentStatus === "succeeded") {
          resolve();
          clearTimeout(timer.current);
        }
      }, 1000);
    });
  };

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
      return;
    }

    await pollStatus();
    onSuccess();
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

export default compose(
  withApollo,
  graphql(CREATE_SETUP_INTENT, { name: "createSetupIntent" })
)(NewCardDetails);
