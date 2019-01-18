import React, { Fragment } from "react";
import Text from "src/components/Text";
import Modal from "src/components/Modal";
import Review from "src/components/Review";
import Heading from "src/components/Heading";
import Spacing from "src/components/Spacing";

const companyName = project => {
  if (project.__typename === "Project") return project.user.companyName
  if (project.confidential) return `${project.industsry} Company`
  return project.clientName
}

const clientDescription = project => {
  if (project.__typename === "Project") return project.companyDescription
  return project.clientDescription
}

const requirements = project => {
  if (project.__typename === "Project") return project.specialistDescription
  return project.requirements
}

export default ({ previousProject }) => {
  const { project, reviews } = previousProject

  return (
    <React.Fragment>
      <Modal.Header>
        <Heading level={2}>{project.primarySkill}</Heading>
        <Text>{companyName(project)}</Text>
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
