import React from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import Criteria from "./Criteria";
import Searching from "./Searching";

const ClientSignup = () => {
  const history = useHistory();
  const location = useLocation();
  const [results, updateResults] = React.useState(null);

  const handleSearch = search => {
    updateResults(null);
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(search),
    });
  };

  const { skill } = queryString.parse(location.search);

  if (skill && results === null) {
    return <Searching updateResults={updateResults} />;
  }

  if (skill && results) {
    return <>{JSON.stringify(results)}</>;
  }

  return <Criteria onSubmit={handleSearch} />;
};

export default ClientSignup;
