import * as React from "react";
import { compose, graphql } from "react-apollo";
import Text from "../../components/Text";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import { Padding } from "../../components/Spacing";
import FETCH_BOOKING from "./fetchBooking.graphql";

const Send = ({ application, data }) => {
  if (data.loading) return <>loading</>

  return (
    <Card>
      <Padding size="l">
        <Padding bottom="s">
          <Heading level={3}>Your proposal has been sent!</Heading>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            Your proposal has been sent to {application.project.user.companyName}.
            Some text about what the freelancer should expect to happen next.
          </Text>
        </Padding>
      </Padding>
    </Card>
  );
};

export default compose(
  graphql(FETCH_BOOKING, {
    options: (props: any) => ({
      variables: {
        id: props.match.params.bookingId,
      },
    }),
  })
)(Send);
