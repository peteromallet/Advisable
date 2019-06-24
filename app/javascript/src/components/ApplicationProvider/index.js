import React from "react";
import { graphql } from "react-apollo";
import { Provider as DonutProvider } from "@advisable/donut";
import { withRouter } from "react-router-dom";
import Loading from "../Loading";
import viewer from "../../graphql/queries/viewer";
import useIntercom from "../../utilities/useIntercom";
import ApplicationContext from "../../applicationContext";
import createTalkSession from "./createTalkSession";

let ApplicationProvider = ({ children, location, data }) => {
  useIntercom(location, data.viewer);
  const talkSession = createTalkSession(data);

  const context = {
    viewer: data.viewer,
    talkSession: talkSession.session,
  };

  const isLoading = data.loading || talkSession.loading;

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
