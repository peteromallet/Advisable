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
    <Box display="flex" justifyContent="flex-end" mb="m">
      <Filter
        multiple
        label="Skills"
        options={data.specialist.skills.map(s => s.name)}
        selected={queryParams?.skills || []}
        onChange={skills => updateFilters({ skills })}
      />
      <Box ml="m">
        <Filter
          label="Industry"
          options={data.specialist.industries.map(s => s.name)}
          selected={queryParams?.industry}
          onChange={industry => updateFilters({ industry })}
        />
      </Box>
    </Box>
  );
}

export default ProjectFilters;
