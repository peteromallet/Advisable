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

export default ({ previousProject }) => {
  const { project, reviews } = previousProject;

  return (
    <React.Fragment>
      <Modal.Header>
        <Heading paddingBottom="xs" level={2}>
          {title(project)}
        </Heading>
        <ProjectValidationStatus status={project.validationStatus} />
      </Modal.Header>
      <Modal.Body>
        <Spacing paddingBottom="s">
          {project.__typename === "Project" && (
            <>
              <Heading level={6}>Client Description</Heading>
              <Text size="s" marginBottom="l">
                {project.companyDescription}
              </Text>

              <Heading level={6}>Requirements</Heading>
              <Text size="s" marginBottom="l">
                {project.specialistDescription}
              </Text>
            </>
          )}
          <Heading level={6}>Project Description</Heading>
          <Text size="s" marginBottom="l">
            {project.description}
          </Text>
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
