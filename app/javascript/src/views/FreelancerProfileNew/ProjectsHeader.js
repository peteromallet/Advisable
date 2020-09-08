import React from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { Box, Link, Text } from "@advisable/donut";

function arrayToSentence(array) {
  return (
    array.slice(0, -2).join(", ") +
    (array.slice(0, -2).length ? ", " : "") +
    array.slice(-2).join(" and ")
  );
}

function ProjectsHeader() {
  const history = useHistory();
  const location = useLocation();

  const queryParams = queryString.parse(location.search, {
    arrayFormat: "bracket",
  });

  const skills = queryParams?.skills || [];
  const industries = queryParams?.industries || [];

  if (skills.length === 0 && industries.length === 0) return null;

  let output = "";

  if (skills.length > 0) {
    output = `Showing ${arrayToSentence(skills)} projects`;
  }

  if (industries.length > 0) {
    if (industries.length === 1) {
      output += ` with ${industries[0]} companies`;
    } else {
      output += " in multiple industries";
    }
  }

  const handleClear = e => {
    e.preventDefault();

    history.replace({
      ...location,
      search: queryString.stringify(
        {
          ...queryParams,
          skills: [],
          industries: [],
        },
        {
          arrayFormat: "bracket",
        }
      ),
    });
  };

  return (
    <>
      <Text
        mb="xxs"
        fontSize="s"
        color="neutral600"
        letterSpacing="-0.01em"
        mt={{ _: "m", m: 0 }}
      >
        {output}.
      </Text>
      <Link.External href="#" fontSize="xs" onClick={handleClear}>
        Clear Filters
      </Link.External>
    </>
  );
}

export default ProjectsHeader;
