import React from "react";
import { get } from "lodash";
import { useLocation } from "react-router-dom";

const Specailists = () => {
  const location = useLocation();
  const specialists = get(location, "state.results");
  return <>{JSON.stringify(specialists)}</>;
};

export default Specailists;
