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

const ApplicationProvider = ({ children }) => {
  const location = useLocation();
  const { data, loading } = useQuery(VIEWER);
  useSentryUser(data?.viewer);
  useIntercom(location, data?.viewer);
  const [logoURL, setLogoURL] = React.useState("/");

  const context = {
    viewer: data?.viewer,
    logoURL,
    setLogoURL,
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
