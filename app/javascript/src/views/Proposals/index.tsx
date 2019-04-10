import * as React from "react";
import { get } from "lodash";
import { compose, graphql } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Rate from "./Rate";
import Send from "./Send";
import Sent from "./Sent";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import NewProposal from "./NewProposal";
import FETCH_BOOKING from "./fetchBooking.graphql";
import FETCH_APPLICATION from "./fetchApplication.graphql";

const Proposals = ({ fetchApplication, fetchBooking }) => {
  if (fetchApplication.loading || (fetchBooking && fetchBooking.loading)) {
    return <Loading />;
  }

  const booking = get(fetchBooking, "booking");
  const application = fetchApplication.application;
  const urlPrefix = `/applications/${application.airtableId}/proposals`;

  return (
    <>
      <Header />
      <Layout>
        <Sidebar booking={booking} application={application} />
        <Layout.Main>
          <Switch>
            <Route
              path={`${urlPrefix}/new`}
              render={props => (
                <NewProposal application={application} {...props} />
              )}
            />
            <Route
              exact
              path={`${urlPrefix}/:bookingId`}
              render={props => (
                <Rate booking={booking} application={application} {...props} />
              )}
            />
            <Route
              path={`${urlPrefix}/:bookingId/tasks`}
              render={props => (
                <Tasks booking={booking} application={application} {...props} />
              )}
            />
            <Route
              path={`${urlPrefix}/:bookingId/send`}
              render={props => (
                <Send booking={booking} application={application} {...props} />
              )}
            />
            <Route
              path={`${urlPrefix}/:bookingId/sent`}
              render={props => (
                <Sent booking={booking} application={application} {...props} />
              )}
            />
            <Route render={() => <Redirect to={`${urlPrefix}/new`} />} />
          </Switch>
        </Layout.Main>
      </Layout>
    </>
  );
};

export default compose(
  graphql(FETCH_APPLICATION, {
    name: "fetchApplication",
    options: (props: any) => ({
      variables: {
        id: props.match.params.applicationId,
      },
    }),
  }),
  graphql(FETCH_BOOKING, {
    name: "fetchBooking",
    skip: props => !props.match.params.proposalId,
    options: (props: any) => {
      return {
        variables: {
          id: props.match.params.proposalId,
        },
      };
    },
  })
)(Proposals);
