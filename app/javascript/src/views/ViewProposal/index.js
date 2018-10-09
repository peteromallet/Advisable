import React from "react";
import { Redirect } from "react-router";
import { Query, Mutation } from "react-apollo";
import Back from "src/components/Back";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Button from "src/components/Button";
import NotFound from "src/views/NotFound";
import Loading from "src/components/Loading";
import Heading from "src/components/Heading";
import OfferForm from "src/components/OfferForm";
import FormattedText from "src/components/FormattedText";
import { currencySymbol } from "src/utilities/currency";
import { withNotifications } from "src/components/Notifications";

import { ProposalComment } from "./styles";
import FETCH_BOOKING from "./fetchBooking.graphql";
import CREATE_OFFER from "src/graphql/createOffer.graphql";
import RejectProposalModal from "src/components/RejectProposalModal";

class ViewProposal extends React.Component {
  state = {
    rejectionModal: false
  };

  get backURL() {
    return `/projects/${this.props.match.params.projectID}/proposed`;
  }

  goBack = () => {
    if (this.props.history.length > 0) {
      this.props.history.goBack();
    } else {
      this.props.history.push(this.backURL);
    }
  };

  render() {
    const { match, history, notifications } = this.props;

    return (
      <Query query={FETCH_BOOKING} variables={{ id: match.params.bookingID }}>
        {query => {
          if (query.loading) return <Loading />;
          if (query.error) return "Something went wrong";
          if (!query.data.booking) return <NotFound />;

          const { booking } = query.data;
          const { application } = booking;
          const { project, specialist } = application;

          if (booking.status !== "Proposed") {
            return <Redirect to={this.backURL} />;
          }

          return (
            <React.Fragment>
              <RejectProposalModal
                booking={booking}
                specialist={specialist}
                isOpen={this.state.rejectionModal}
                onClose={() => this.setState({ rejectionModal: false })}
              />
              <Back onClick={this.goBack}>Candidates</Back>
              <Card marginTop="xl" padding="xl">
                <Heading size="l">Proposal from {specialist.name}</Heading>
                <Text marginBottom="l">
                  Review the details of this proposal below
                </Text>
                {booking.proposalComment && (
                  <ProposalComment>
                    <h4>Comment from {specialist.name}</h4>
                    {booking.proposalComment}
                  </ProposalComment>
                )}
                <Mutation mutation={CREATE_OFFER}>
                  {createOffer => (
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
                      secondaryAction={form => (
                        <Button
                          type="button"
                          onClick={() =>
                            this.setState({ rejectionModal: true })
                          }
                        >
                          Reject Applicant
                        </Button>
                      )}
                      onSubmit={async values => {
                        const input = {
                          ...values,
                          applicationId: application.id,
                          proposalId: booking.id
                        };

                        await createOffer({
                          variables: { input }
                        });

                        notifications.notify(
                          `An offer has been sent to ${specialist.name}`
                        );

                        history.replace(backURL);
                      }}
                    />
                  )}
                </Mutation>
              </Card>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withNotifications(ViewProposal);
