import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import Loading from "../Loading";
import viewer from "../../graphql/queries/viewer";
import useIntercom from "../../utilities/useIntercom";

let ApplicationProvider = ({ children, location, data }) => {
  useIntercom(location, data.viewer);

  if (data.loading) {
    return <Loading />;
  }

  return children;
};

// Add viewer query
ApplicationProvider = graphql(viewer)(ApplicationProvider);
// Add react router HOC
ApplicationProvider = withRouter(ApplicationProvider);

export default ApplicationProvider;
