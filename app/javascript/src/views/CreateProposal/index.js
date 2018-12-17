import React from "react";
import { Query, Mutation } from "react-apollo";
import Card from "src/components/Card";
import { Redirect } from "react-router";
import NotFound from "src/views/NotFound";
import Loading from "src/components/Loading";
import Heading from "src/components/Heading";
import Container from "src/components/Container";
import Text from "src/components/Text";
import { withNotifications } from "src/components/Notifications";
import ProposalForm from "./components/ProposalForm";
import FETCH_DATA from "./fetchApplication.graphql";
import CREATE_PROPOSAL from "src/graphql/createProposal.graphql";
import { currencySymbol } from "src/utilities/currency";

const CreateProposal = ({ match, history, notifications }) => {
  return (
    <Query query={FETCH_DATA} variables={{ id: match.params.applicationID }}>
      {query => {
        if (query.error) return null;
        if (query.loading) return <Loading />;
        if (!query.data.application) return <NotFound />;

        const { project } = query.data.application;
        const { proposal } = query.data.application;

        const proposalURL = id => {
          return `/applications/${match.params.applicationID}/proposals/${id}`;
        };

        if (proposal) {
          return <Redirect to={proposalURL(proposal.id)} />;
        }

        return (
          <Container size="m">
            <Card padding="xl">
              <Heading marginBottom="xs" size="l">
                Proposal for {project.user.companyName}
              </Heading>
              <Text marginBottom="xl" size="l">
                Send a proposal to {project.user.companyName}
              </Text>
              <Mutation mutation={CREATE_PROPOSAL}>
                {createProposal => (
                  <ProposalForm
                    currency={currencySymbol(project.currency)}
                    initialValues={{ type: "Fixed", rateType: "Fixed" }}
                    onSubmit={async values => {
                      let response = await createProposal({
                        variables: {
                          input: {
                            ...values,
                            applicationId: match.params.applicationID
                          }
                        }
                      });

                      const bookingID = response.data.createProposal.booking.id;

                      notifications.notify(`
                              Your proposal has been sent to ${project.user.companyName}
                            `);

                      history.replace(proposalURL(bookingID));
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

export default withNotifications(CreateProposal);
