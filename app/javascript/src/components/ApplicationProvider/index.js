import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import Loading from "../Loading";
import viewer from "../../graphql/queries/viewer";
import useIntercom from "../../utilities/useIntercom";
import ApplicationContext from "../../applicationContext";

let ApplicationProvider = ({ children, location, data }) => {
  useIntercom(location, data.viewer);
  const [logoURL, setLogoURL] = React.useState("/");

  const context = {
    viewer: data.viewer,
    logoURL,
    setLogoURL,
  };

  const isLoading = data.loading;

  return (
    <ApplicationContext.Provider value={context}>
      <DonutProvider>{isLoading ? <Loading /> : children}</DonutProvider>
    </ApplicationContext.Provider>
  );
};

// Add viewer query
ApplicationProvider = graphql(viewer)(ApplicationProvider);
// Add react router HOC
ApplicationProvider = withRouter(ApplicationProvider);

export default ApplicationProvider;
