import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useLocation } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import Loading from "../Loading";
import VIEWER from "../../graphql/queries/viewer";
import useIntercom from "../../utilities/useIntercom";
import ApplicationContext from "../../applicationContext";

let ApplicationProvider = ({ children }) => {
  const location = useLocation();
  const { data, loading } = useQuery(VIEWER);
  useIntercom(location, data?.viewer);
  const [logoURL, setLogoURL] = React.useState("/");

  const context = {
    viewer: data?.viewer,
    logoURL,
    setLogoURL,
  };

  return (
    <ApplicationContext.Provider value={context}>
      <DonutProvider>{loading ? <Loading /> : children}</DonutProvider>
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
