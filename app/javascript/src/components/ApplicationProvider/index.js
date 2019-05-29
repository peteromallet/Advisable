import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import Loading from "../Loading";
import viewer from "../../graphql/queries/viewer";
import useIntercom from "../../utilities/useIntercom";
import ApplicationContext from "../../applicationContext";

let ApplicationProvider = ({ children, location, data }) => {
  useIntercom(location, data.viewer);

  const context = {
    viewer: data.viewer,
  };

  return (
    <ApplicationContext.Provider value={context}>
      {data.loading ? <Loading /> : children}
    </ApplicationContext.Provider>
  );
};

// Add viewer query
ApplicationProvider = graphql(viewer)(ApplicationProvider);
// Add react router HOC
ApplicationProvider = withRouter(ApplicationProvider);

export default ApplicationProvider;
