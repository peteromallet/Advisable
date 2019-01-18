import React, { useState } from "react";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Review from "src/components/Review";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import { PreviousProject, ProjectTitle } from "./styles";

const companyName = project => {
  if (project.__typename === "Project") return project.user.companyName
  if (project.confidential) return `${project.industsry} Company`
  return project.clientName
}

export default ({ previousProject, specialistId }) => {
  const [isOpen, setOpen] = useState(false);

  const { project, reviews } = previousProject;

  const openProject = e => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <React.Fragment>
      <PreviousProjectModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id={project.airtableId}
        type={project.__typename}
        specialistId={specialistId}
      />
      <PreviousProject>
        <Heading marginBottom="xs" level={4}>
          <ProjectTitle href="#" onClick={openProject}>
            {project.primarySkill} at {companyName(project)}
          </ProjectTitle>
        </Heading>
        <Text marginBottom="l" size="s">
          {project.description}
        </Text>
        {reviews.length > 0 && (
          <Spacing paddingBottom="xl">
            {reviews.map(review => (
              <Review
                key={review.id}
                review={review}
                companyName={companyName(project)}
              />
            ))}
          </Spacing>
        )}
        <Button styling="outlined" onClick={openProject}>
          View project details
        </Button>
      </PreviousProject>
    </React.Fragment>
  );
};
