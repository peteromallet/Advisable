import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import Loading from "../Loading";
import VIEWER from "../../graphql/queries/getViewer.graphql";
import useIntercom from "../../utilities/useIntercom";
import ApplicationContext from "../../applicationContext";
import useSentryUser from "src/hooks/useSentryUser";
import useMixpanelUser from "src/hooks/useMixpanelUser";
import useHotjarUser from "src/hooks/useHotjarUser";
import useCustomerly from "src/hooks/useCustomerly";

const ApplicationProvider = ({ children }) => {
  const location = useLocation();
  const { data, loading } = useQuery(VIEWER);
  useSentryUser(data?.viewer);
  useHotjarUser(data?.viewer);
  useMixpanelUser(data?.viewer);
  useCustomerly(data?.viewer);
  useIntercom(location, data?.viewer);

  const context = {
    viewer: data?.viewer,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ApplicationContext.Provider value={context}>
      <Helmet>
        <title>Advisable</title>
      </Helmet>
      <DonutProvider>{children}</DonutProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
