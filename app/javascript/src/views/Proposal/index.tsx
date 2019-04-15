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
import FETCH_APPLICATION from "./fetchApplication.graphql";

const Proposals = ({ fetchApplication, fetchBooking }) => {
  if (fetchApplication.loading || (fetchBooking && fetchBooking.loading)) {
    return <Loading />;
  }

  const booking = get(fetchBooking, "booking");
  const application = fetchApplication.application;
  const urlPrefix = `/applications/${application.airtableId}/proposal`;

  return (
    <>
      <Header />
      <Layout>
        <Sidebar booking={booking} application={application} />
        <Layout.Main>
          <Switch>
            <Route
              exact
              path={urlPrefix}
              render={props => (
                <Rate booking={booking} application={application} {...props} />
              )}
            />
            <Route
              path={`${urlPrefix}/tasks`}
              render={props => (
                <Tasks booking={booking} application={application} {...props} />
              )}
            />
            <Route
              path={`${urlPrefix}/send`}
              render={props => (
                <Send booking={booking} application={application} {...props} />
              )}
            />
            <Route
              path={`${urlPrefix}/sent`}
              render={props => (
                <Sent booking={booking} application={application} {...props} />
              )}
            />
            <Route render={() => <Redirect to={urlPrefix} />} />
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
  })
)(Proposals);
