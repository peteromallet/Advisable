import React from "react";
import { useQuery } from "@apollo/client";
import { Provider as DonutProvider } from "@advisable/donut";
import Loading from "../Loading";
import VIEWER from "../../graphql/queries/getViewer.graphql";
import ApplicationContext from "../../applicationContext";
import useSentryUser from "src/hooks/useSentryUser";
import useHotjarUser from "src/hooks/useHotjarUser";
import useSegmentIdentity from "src/hooks/useSegmentIdentity";

const ApplicationProvider = ({ children }) => {
  const { data, loading } = useQuery(VIEWER);
  useSentryUser(data?.viewer);
  useHotjarUser(data?.viewer);
  useSegmentIdentity(data?.viewer);

  const context = {
    viewer: data?.viewer,
  };

  const isAdmin = data?.viewer?.isAdmin;
  if (isAdmin) {
    window.__ADMIN = true;
  }

  if (window._ADMIN && !isAdmin) {
    window.__ADMIN = false;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ApplicationContext.Provider value={context}>
      <DonutProvider>{children}</DonutProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
