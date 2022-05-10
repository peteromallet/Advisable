import React from "react";
import { Helmet } from "react-helmet";
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
