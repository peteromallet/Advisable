import React, { useState } from "react";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Review from "src/components/Review";
import Spacing, { Padding } from "src/components/Spacing";
import Divider from "src/components/Divider";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import ProjectValidationStatus from "src/components/ProjectValidationStatus";
import { ProjectTitle } from "./styles";

const companyName = project => {
  if (project.__typename === "Project") return project.user.companyName;
  return project.clientName;
};

const title = project => {
  return `${project.primarySkill} at ${companyName(project)}`;
};

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
      <Padding size="xl">
        <Padding bottom="xs">
          <Text size="l" weight="semibold">
            <ProjectTitle href="#" onClick={openProject}>
              {title(project)}
            </ProjectTitle>
          </Text>
        </Padding>
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

        <Spacing marginBottom="xl">
          <ProjectValidationStatus status={project.validationStatus} />
        </Spacing>

        <Button styling="outlined" onClick={openProject}>
          View project details
        </Button>
      </Padding>
      <Divider />
    </React.Fragment>
  );
};
