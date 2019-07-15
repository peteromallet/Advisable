import React from "react";
import { get } from "lodash";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, Box, Skeleton } from "@advisable/donut";
import NewCardDetails from "./NewCardDetails";
import ExistingCardDetails from "./ExistingCardDetails";

export const GET_PAYMENT_METHOD = gql`
  query paymentMethod {
    viewer {
      ... on User {
        id
        paymentMethod {
          id
          last4
          brand
          expMonth
          expYear
        }
      }
    }
  }
`;

const CardDetails = ({ match, data, history }) => {
  let [newCard, setNewCard] = React.useState(false);
  let applicationId = match.params.applicationId;
  let backURL = `/manage/${applicationId}`;

  const gotoTerms = () => {
    history.push(`/manage/${applicationId}/payment_terms`);
  };

  let paymentMethod = get(data, "viewer.paymentMethod", null);

  if (data.loading) {
    return (
      <Box p="l">
        <Skeleton width={150} height={20} mb="m" />
        <Skeleton height={12} mb="xs" />
        <Skeleton width={250} height={12} />
      </Box>
    );
  }

  return (
    <Box p="l">
      <Link mb="m" to={backURL} replace>
        ← Back
      </Link>
      {paymentMethod === null || newCard ? (
        <NewCardDetails onSuccess={gotoTerms} />
      ) : (
        <ExistingCardDetails
          onContinue={gotoTerms}
          onUseDifferentCard={() => setNewCard(true)}
          paymentMethod={data.viewer.paymentMethod}
        />
      )}
    </Box>
  );
};

export default graphql(GET_PAYMENT_METHOD)(CardDetails);
