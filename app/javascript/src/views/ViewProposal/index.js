import React from "react";
import { Redirect } from "react-router";
import { Query, Mutation } from "react-apollo";
import Card from "src/components/Card";
import Text from "src/components/Text";
import NotFound from "src/views/NotFound";
import Loading from "src/components/Loading";
import Heading from "src/components/Heading";
import OfferForm from "src/components/OfferForm";
import { currencySymbol } from "src/utilities/currency";
import { withNotifications } from "src/components/Notifications";

import FETCH_BOOKING from "./fetchBooking.graphql";
import UPDATE_BOOKING from "./updateBooking.graphql";
import SEND_OFFER from "./sendOffer.graphql";

// Renders the view for a client viewing a specialists proposal.
const ViewProposal = ({ match, history, notifications }) => {
  const redirectURL = `/projects/${match.params.projectID}/introduced`;
  const goBack = () => history.push(redirectURL);

  return (
    <Query query={FETCH_BOOKING} variables={{ id: match.params.bookingID }}>
      {query => {
        if (query.loading) return <Loading />;
        if (query.error) return "Something went wrong";
        if (!query.data.booking) return <NotFound />;

        const { booking } = query.data;
        const { application } = booking;
        const { project, specialist } = application;

        if (booking.status !== "Proposed") return <Redirect to={redirectURL} />;

        return (
          <React.Fragment>
            <Heading size="l">New proposal from {specialist.name}</Heading>
            <Text>Review the details of this proposal below</Text>
            <Card marginTop="xl" padding="xl">
              <Mutation mutation={UPDATE_BOOKING}>
                {updateBooking => (
                  <Mutation mutation={SEND_OFFER}>
                    {sendOffer => (
                      <OfferForm
                        currency={currencySymbol(project.currency)}
                        initialValues={{
                          type: booking.type,
                          rate: booking.rate,
                          rateType: booking.rateType,
                          duration: booking.duration,
                          deliverables: booking.deliverables,
                          startDate: booking.startDate,
                          endDate: booking.endDate
                        }}
                        onSubmit={async values => {
                          const input = {
                            ...values,
                            id: booking.id,
                            rate: Number(
                              values.rate.replace(/[^0-9\.-]+/g, "")
                            ),
                            rateLimit: values.rateLimit && Number(
                              values.rateLimit.replace(/[^0-9\.-]+/g, "")
                            )
                          };

                          await updateBooking({
                            variables: { input }
                          });

                          await sendOffer({
                            variables: {
                              input: { id: booking.id }
                            }
                          });

                          notifications.notify(
                            `An offer has been sent to ${specialist.name}`
                          );

                          goBack();
                        }}
                      />
                    )}
                  </Mutation>
                )}
              </Mutation>
            </Card>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default withNotifications(ViewProposal);
