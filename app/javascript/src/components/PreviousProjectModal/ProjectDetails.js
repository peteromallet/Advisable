import React, { Fragment } from "react";
import Text from "src/components/Text";
import Modal from "src/components/Modal";
import Review from "src/components/Review";
import Heading from "src/components/Heading";
import Spacing from "src/components/Spacing";

export default ({ project }) => {
  return (
    <React.Fragment>
      <Modal.Header>
        <Heading level={2}>{project.title}</Heading>
        <Text>{project.clientName}</Text>
      </Modal.Header>
      <Modal.Body>
        <Spacing paddingBottom="s">
          <Heading level={6}>Client Description</Heading>
          <Text size="s" marginBottom="l">
            {project.clientDescription}
          </Text>

          <Heading level={6}>Requirements</Heading>
          <Text size="s" marginBottom="l">
            {project.requirements}
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

        {project.reviews.map(review => (
          <Review
            key={review.id}
            review={review}
            companyName={project.clientName}
          />
        ))}
      </Modal.Body>
    </React.Fragment>
  );
};
