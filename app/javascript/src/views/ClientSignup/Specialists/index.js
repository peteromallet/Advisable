import React from "react";
import queryString from "query-string";
import { useQuery } from "react-apollo";
import { useLocation, Redirect } from "react-router-dom";
import SEARCH from "./search";
import Searching from "./Searching";
import SearchResults from "./SearchResults";
import SelectPriceRange from "./SelectPriceRange";
import { withinLimits } from "./rangeHelpers";
import useInterval from "../../../hooks/useInterval";

function Specialists() {
  const location = useLocation();
  const [showResults, setShowResults] = React.useState(false);

  useInterval(() => {
    setShowResults(true);
  }, 2000);

  const queryParams = queryString.parse(location.search, {
    parseBooleans: true,
  });

  const variables = { skill: queryParams.skill };

  if (queryParams.industryRequired) {
    variables.industry = queryParams.industry;
    variables.industryRequired = queryParams.industryRequired;
  }

  if (queryParams.companyTypeRequired) {
    variables.companyType = queryParams.companyType;
    variables.companyTypeRequired = queryParams.companyTypeRequired;
  }

  const { data, loading } = useQuery(SEARCH, {
    variables,
    skip: !variables.skill,
  });

  if (!variables.skill) {
    return <Redirect to="/clients/signup" />;
  }

  if (loading || showResults === false) {
    return <Searching />;
  }

  let specialists = data.specialists.nodes;

  if (location.state?.priceRange) {
    const priceRange = location.state.priceRange;
    specialists = specialists.filter(specialist => {
      return (
        withinLimits(specialist.hourlyRate) >= priceRange.min &&
        withinLimits(specialist.hourlyRate) <= priceRange.max
      );
    });
  }

  if (specialists.length === 0) {
    return (
      <Redirect
        to={{
          ...location,
          pathname: "/clients/signup/save",
        }}
      />
    );
  }

  // If there is more than 6 specialists and there is no price range
  // filter then show the range selection
  if (specialists.length >= 6 && !location.state?.priceRange) {
    return <SelectPriceRange specialists={specialists} />;
  }

  return <SearchResults specialists={specialists} />;
}

export default Specialists;
