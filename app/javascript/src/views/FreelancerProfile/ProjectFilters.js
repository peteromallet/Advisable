import React from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { Box } from "@advisable/donut";
import Filter from "./Filter";

function ProjectFilters({ data }) {
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search, {
    arrayFormat: "bracket",
  });

  const updateFilters = filters => {
    history.replace({
      ...location,
      search: queryString.stringify(
        {
          ...queryParams,
          ...filters,
        },
        {
          arrayFormat: "bracket",
        }
      ),
    });
  };

  return (
    <Box
      mb={{ _: "m", md: "s" }}
      justifyContent="flex-end"
      display={{ _: "block", m: "flex" }}
    >
      <Box mb={{ _: "s", m: null }}>
        <Filter
          label="Skill"
          selected={queryParams?.skills || []}
          options={data.specialist.projectSkills.nodes.map(s => s.name)}
          onChange={skills => updateFilters({ skills })}
        />
      </Box>
      <Box ml={{ _: null, m: "m" }}>
        <Filter
          label="Industry"
          selected={queryParams?.industries || []}
          options={data.specialist.industries.map(i => i.name)}
          onChange={industries => updateFilters({ industries })}
        />
      </Box>
    </Box>
  );
}

export default ProjectFilters;
