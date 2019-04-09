import * as React from "react";
import { matchPath } from "react-router";
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
  if (fetchApplication.loading || fetchBooking.loading) {
    return <Loading />;
  }

  const booking = fetchBooking.booking;
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
    skip: !matchPath(location.pathname, {
      path: "/applications/:applicationId/proposals/:proposalId",
    }),
    options: (props: any) => {
      const match = matchPath<{ proposalId: string }>(location.pathname, {
        path: "/applications/:applicationId/proposals/:proposalId",
      });
      return {
        variables: {
          id: match.params.proposalId,
        },
      };
    },
  })
)(Proposals);
