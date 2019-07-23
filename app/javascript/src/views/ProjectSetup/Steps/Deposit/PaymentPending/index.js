import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { Text } from "@advisable/donut";
import React, { Fragment } from "react";
import Loading from "src/components/Loading";

export const GET_DEPOSIT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      depositOwed
    }
  }
`;

const PaymentPending = ({ id, client, onSuccess }) => {
  const [seconds, setSeconds] = React.useState(0);
  const [timer, setTimer] = React.useState(null);

  const poll = () => {
    setTimer(
      setInterval(async () => {
        let response = await client.query({
          fetchPolicy: "network-only",
          query: GET_DEPOSIT,
          variables: {
            id,
          },
        });

        const { project } = response.data;
        if (project.depositOwed === 0) {
          onSuccess();
          return;
        }

        setSeconds(seconds + 2);
      }, 2000)
    );
  };

  React.useEffect(() => {
    poll();
    return clearInterval(timer);
  }, []);

  return (
    <Fragment>
      <Loading />
      <Text textAlign="center" size="s" color="neutral.7" lineHeight="s">
        Please wait while we process your payment...
      </Text>
    </Fragment>
  );
};

export default withApollo(PaymentPending);
