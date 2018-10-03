// View for a candidate to edit their proposal to a client.
import React from "react";
import { Query, Mutation } from "react-apollo";
import Card from "src/components/Card";
import Loading from "src/components/Loading";
import NotFound from "src/views/NotFound";
import Container from "src/components/Container";
import Heading from "src/components/Heading";
import Text from "src/components/Text";
import { currencySymbol } from "src/utilities/currency";
import { withNotifications } from "src/components/Notifications";

import ProposalForm from "../CreateProposal/components/ProposalForm";
import FETCH_PROPOSAL from "./fetchProposal.graphql";
import UPDATE_BOOKING from "./updateBooking.graphql";

const EditProposal = ({ match, notifications }) => {
  return (
    <Query query={FETCH_PROPOSAL} variables={{ id: match.params.proposalID }}>
      {query => {
        if (query.loading) return <Loading />;
        const booking = query.data.booking;
        if (!booking || booking.status !== 'Proposed') return <NotFound />;
        const client = booking.application.project.client;

        return (
          <Container>
            <Card padding="xl">
              <Heading marginBottom="xs" size="l">
                Proposal for {client.name}
              </Heading>
              <Text marginBottom='xl' size='l'>Send a proposal project to {client.name}</Text>
              <Mutation mutation={UPDATE_BOOKING}>
                {updateBooking => (
                  <ProposalForm
                    submitLabel="Update Proposal"
                    currency={currencySymbol(
                      booking.application.project.currency
                    )}
                    initialValues={{
                      type: booking.type,
                      startDate: booking.startDate,
                      endDate: booking.endDate,
                      duration: booking.duration,
                      rate: booking.rate,
                      rateType: booking.rateType,
                      deliverables: booking.deliverables,
                      proposalComment: booking.proposalComment
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                      const input = {
                        ...values,
                        id: booking.id
                      };

                      await updateBooking({
                        variables: { input }
                      });

                      notifications.notify(`Your proposal has been updated`);
                      setSubmitting(false);
                    }}
                  />
                )}
              </Mutation>
            </Card>
          </Container>
        );
      }}
    </Query>
  );
};

export default withNotifications(EditProposal);
