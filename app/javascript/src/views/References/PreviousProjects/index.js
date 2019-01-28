import React from "react";
import { get } from "lodash";
import { graphql } from "react-apollo";
import PreviousProjects from "src/components/PreviousProjects";
import PREVIOUS_PROJECTS from "./previousProjects.graphql";

const Projects = ({ data, specialistId }) => {
  return (
    <PreviousProjects
      specialistId={specialistId}
      previousProjects={get(data, "specialist.previousProjects")}
      loading={data.loading}
    />
  );
};

export default graphql(PREVIOUS_PROJECTS, {
  options: ({ specialistId }) => ({
    variables: {
      id: specialistId
    }
  })
})(Projects);
