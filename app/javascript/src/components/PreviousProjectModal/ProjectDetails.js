import React, { Fragment } from "react";
import Text from "src/components/Text";
import Modal from "src/components/Modal";
import Review from "src/components/Review";
import Heading from "src/components/Heading";
import Spacing from "src/components/Spacing";
import ProjectValidationStatus from "src/components/ProjectValidationStatus";

const companyName = project => {
  if (project.__typename === "Project") return project.user.companyName;
  return project.clientName;
};

const title = project => {
  return `${project.primarySkill} at ${companyName(project)}`;
};

const clientDescription = project => {
  if (project.__typename === "Project") return project.companyDescription;
  return project.clientDescription;
};

const requirements = project => {
  if (project.__typename === "Project") return project.specialistDescription;
  return project.requirements;
};

export default ({ previousProject }) => {
  const { project, reviews } = previousProject;

  return (
    <React.Fragment>
      <Modal.Header>
        <Heading paddingBottom="xs" level={2}>{title(project)}</Heading>
        <ProjectValidationStatus status={project.validationStatus} />
      </Modal.Header>
      <Modal.Body>
        <Spacing paddingBottom="s">
          <Heading level={6}>Client Description</Heading>
          <Text size="s" marginBottom="l">
            {clientDescription(project)}
          </Text>

          <Heading level={6}>Requirements</Heading>
          <Text size="s" marginBottom="l">
            {requirements(project)}
          </Text>

          <Heading level={6}>Project Description</Heading>
          <Text size="s" marginBottom="l">
            {project.description}
          </Text>

          {project.results && (
            <Fragment>
              <Heading level={6}>Results</Heading>
              <Text size="s" marginBottom="l">
                {project.results}
              </Text>
            </Fragment>
          )}
        </Spacing>

        {reviews.map(review => (
          <Review
            key={review.id}
            review={review}
            companyName={companyName(project)}
          />
        ))}
      </Modal.Body>
    </React.Fragment>
  );
};
