import React from "react";

const ApplicationContext = React.createContext({
  viewer: undefined,
  logoURL: "/",
  setLogoURL: () => {},
});

export default ApplicationContext;
