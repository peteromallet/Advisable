import * as React from "react";
import { Query } from "react-apollo";
import NotFound from "../NotFound";
import { Header, Loading } from "../../components";
import ApplicationFlow from "./ApplicationFlow";
import FETCH_APPLICATION from "./fetchApplication.graphql";

export default ({ match }) => {
  return (
    <React.Fragment>
      <Header />
      <Query
        query={FETCH_APPLICATION}
        variables={{ id: match.params.applicationId }}
      >
        {query => {
          if (query.loading) return <Loading />;
          if (!query.data.application) return <NotFound />;

          return (
            <ApplicationFlow
              match={match}
              application={query.data.application}
            />
          );
        }}
      </Query>
    </React.Fragment>
  );
};
