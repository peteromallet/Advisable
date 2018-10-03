import React from "react";
import { Query, Mutation } from "react-apollo";
import Card from "src/components/Card";
import { Redirect } from 'react-router';
import NotFound from "src/views/NotFound";
import Loading from "src/components/Loading";
import Heading from 'src/components/Heading';
import Text from 'src/components/Text';
import { withNotifications } from "src/components/Notifications";
import ProposalForm from "./components/ProposalForm";
import FETCH_DATA from "./fetchApplication.graphql";
import CREATE_BOOKING from "./createBooking.graphql";
import SEND_PROPOSAL from "./sendProposal.graphql";
import ProposalSent from './components/ProposalSent';
import { currencySymbol } from "src/utilities/currency";
import { Container } from "./styles";

class CreateProposal extends React.Component {
  render = () => {
    return (
      <Query
        query={FETCH_DATA}
        variables={{ id: this.props.match.params.applicationID }}
      >
        {query => {
          if (query.error) return null;
          if (query.loading) return <Loading />;
          if (!query.data.application) return <NotFound />;

          const { project } = query.data.application;
          const { proposal } = query.data.application;
          const { client } = project;

          const proposalURL = (id) => {
            return `/applications/${this.props.match.params.applicationID}/proposals/${id}`
          }

          if (proposal) {
            return <Redirect to={proposalURL(proposal.id)} />
          }

          return (
            <Container>
              <Card padding='xl'>
                <Heading marginBottom='xs' size='l'>Proposal for {client.name}</Heading>
                <Text marginBottom='xl' size='l'>Send a proposal project to {client.name}</Text>
                <Mutation mutation={CREATE_BOOKING}>
                  {createBooking => (
                    <Mutation mutation={SEND_PROPOSAL}>
                      {sendProposal => (
                        <ProposalForm
                          currency={currencySymbol(project.currency)}
                          initialValues={{ type: "Fixed", rateType: "Fixed" }}
                          onSubmit={async values => {
                            let response = await createBooking({
                              variables: {
                                input: {
                                  rate: values.rate,
                                  type: values.type,
                                  rateType: values.rateType,
                                  startDate: values.startDate,
                                  endDate: values.endDate,
                                  duration: values.duration,
                                  deliverables: values.deliverables,
                                  applicationId: this.props.match.params
                                    .applicationID
                                }
                              }
                            });

                            const bookingID = response.data.createBooking.booking.id;

                            await sendProposal({
                              variables: { id: bookingID }
                            });

                            this.props.notifications.notify(`
                              Your proposal has been sent to ${client.name}
                            `)

                            this.props.history.replace(proposalURL(bookingID))
                          }}
                        />
                      )}
                    </Mutation>
                  )}
                </Mutation>
              </Card>
            </Container>
          );
        }}
      </Query>
    );
  };
}

export default withNotifications(CreateProposal);
