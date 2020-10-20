import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Text } from "@advisable/donut";
import { Redirect } from "react-router-dom";
import React, { Fragment } from "react";
import Loading from "src/components/Loading";

export const GET_DEPOSIT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      airtableId
      depositOwed
    }
  }
`;

const PaymentPending = ({ id }) => {
  const { data } = useQuery(GET_DEPOSIT, {
    variables: { id },
    fetchPolicy: "no-cache",
    pollInterval: 2000,
  });

  const depositOwed = data?.project?.depositOwed;

  if (depositOwed === 0) {
    const id = data.project.airtableId;
    return <Redirect to={`/project_setup/${id}/confirm`} />;
  }

  return (
    <Fragment>
      <Loading />
      <Text textAlign="center" size="s" color="neutral700" lineHeight="s">
        Please wait while we process your payment...
      </Text>
    </Fragment>
  );
};

export default PaymentPending;
