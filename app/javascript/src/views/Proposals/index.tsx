import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { graphql, ChildDataProps } from "react-apollo";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Rate from "./Rate";
import Send from "./Send";
import Sent from "./Sent";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import NewProposal from "./NewProposal";
import FETCH_APPLICATION from "./fetchApplication.graphql";
import { match } from "react-router";
import { ApplicationType } from "../../types";

interface Params {
  applicationId: string;
}

interface Props {
  match: match<Params>;
}

type Variables = {
  id: string;
};

type Response = {
  application: ApplicationType;
};

type ChildProps = ChildDataProps<Props, Response, Variables>;

const Proposals = ({ data }) => {
  if (data.loading) return <div>loading...</div>;
  const application = data.application;
  const urlPrefix = `/applications/${application.airtableId}/proposals`;

  return (
    <>
      <Header />
      <Layout>
        <Sidebar application={application} />
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
              render={props => <Rate application={application} {...props} />}
            />
            <Route
              path={`${urlPrefix}/:bookingId/tasks`}
              render={props => <Tasks application={application} {...props} />}
            />
            <Route
              path={`${urlPrefix}/:bookingId/send`}
              render={props => <Send application={application} {...props} />}
            />
            <Route
              path={`${urlPrefix}/:bookingId/sent`}
              render={props => <Sent application={application} {...props} />}
            />
            <Route render={() => <Redirect to={`${urlPrefix}/new`} />} />
          </Switch>
        </Layout.Main>
      </Layout>
    </>
  );
};

export default graphql<Props, Response, Variables, ChildProps>(
  FETCH_APPLICATION,
  {
    options: (props: Props) => ({
      variables: {
        id: props.match.params.applicationId,
      },
    }),
  }
)(Proposals);
