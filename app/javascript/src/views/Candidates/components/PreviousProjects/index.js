// Fetches a specialists previous projects.

import React, { useRef, useLayoutEffect } from "react";
import { graphql } from "react-apollo";
import Heading from "src/components/Heading";
import PreviousProject from "./PreviousProject";
import FETCH_PROJECTS from "./fetchProjects.graphql";

const PreviousProjects = ({ data, recalculateHeight }) => {
  useLayoutEffect(() => {
    recalculateHeight()
  })

  return (
    <React.Fragment>
      <Heading level="6" marginBottom="s">
        Previous Projects
      </Heading>

      {data.loading ? (
        <div>loading...</div>
      ) : (
        <SpecialistProjects
          previousProjects={data.specialist.previousProjects}
        />
      )}
    </React.Fragment>
  );
};

const SpecialistProjects = ({ previousProjects }) => {
  if (previousProjects.length > 0) {
    return previousProjects.map(project => (
      <PreviousProject key={project.id} project={project} />
    ));
  }

  return null;
};

export default graphql(FETCH_PROJECTS, {
  options: props => ({
    variables: {
      specialistId: props.specialistId
    }
  })
})(PreviousProjects);
