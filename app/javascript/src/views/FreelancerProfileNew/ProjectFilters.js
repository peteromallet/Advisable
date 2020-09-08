import React from "react";
import queryString from "query-string";
import { Box, Text } from "@advisable/donut";
import { useLocation, useHistory } from "react-router-dom";
import Filter from "./Filter";
import ProjectsHeader from "./ProjectsHeader";

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
    <>
      <Box
        alignItems="center"
        justifyContent="space-between"
        display={{ _: "block", m: "flex" }}
      >
        <Box display={{ _: "none", m: "block" }}>
          <Text
            fontSize="xxl"
            color="blue900"
            fontWeight="semibold"
            letterSpacing="-0.03em"
          >
            Previous projects
          </Text>
        </Box>
        <Box display={{ _: "block", m: "flex" }}>
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
      </Box>

      <Box mb={{ _: "l", md: "m" }}>
        <ProjectsHeader />
      </Box>
    </>
  );
}

export default ProjectFilters;
