import React from "react";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import Loading from "../Loading";
import useViewer from "../../hooks/useViewer";
import PaymentMethodForm from "../PaymentMethodForm";

export const CREATE_SETUP_INTENT = gql`
  mutation setupIntent {
    createSetupIntent(input: {}) {
      secret
    }
  }
`;

export const GET_SETUP_INTENT_STATUS = gql`
  query setupIntentStatus {
    viewer {
      ... on User {
        id
        setupIntentStatus
      }
    }
  }
`;

const UpdatePaymentMethod = ({ onSuccess }) => {
  const client = useApolloClient();
  const [createSetupIntent] = useMutation(CREATE_SETUP_INTENT);
  let timer = React.useRef(null);
  let viewer = useViewer();
  let [secret, setSecret] = React.useState(null);

  React.useEffect(() => {
    createSetupIntent().then((r) => {
      setSecret(r.data.createSetupIntent.secret);
    });
  }, [createSetupIntent]);

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
          clearTimeout(timer.current);
          resolve();
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
      },
    );

    if (error) {
      formik.setStatus(error.message);
      return;
    }

    await pollStatus();
    onSuccess();
  };

  return (
    <PaymentMethodForm
      handleCardDetails={handleCardDetails}
      userId={viewer.id}
      buttonLabel="Add Card"
    />
  );
};

export default UpdatePaymentMethod;
