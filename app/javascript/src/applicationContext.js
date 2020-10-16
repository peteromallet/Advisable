import { createContext } from "react";

const ApplicationContext = createContext({
  viewer: undefined,
  logoURL: "/",
  setLogoURL: () => {},
});

export default ApplicationContext;
