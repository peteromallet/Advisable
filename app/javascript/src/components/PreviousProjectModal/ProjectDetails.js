import React from "react";
import { get } from "lodash";
import { Text, Box } from "@advisable/donut";
import Modal from "src/components/Modal";
import Review from "src/components/Review";
import Heading from "src/components/Heading";
import Spacing from "src/components/Spacing";
import ProjectValidationStatus from "src/components/ProjectValidationStatus";
import ProjectValidationPrompt from "src/components/ProjectValidationPrompt";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import useViewer from "../../hooks/useViewer";

const companyName = project => {
  if (project.__typename === "Project") return project.user.companyName;
  return project.clientName;
};

const title = project => {
  return `${project.primarySkill} at ${companyName(project)}`;
};

const ProjectDetails = ({ previousProject }) => {
  const viewer = useViewer();
  const { project, reviews } = previousProject;

  const clientDescription =
    project.__typename === "Project"
      ? project.companyDescription
      : project.clientDescription;

  const requirements =
    project.__typename === "Project"
      ? project.specialistDescription
      : project.requirements;

  return (
    <React.Fragment>
      <Modal.Header>
        <Text mb="xs" as="h2" fontSize="xl" fontWeight="medium">
          {title(project)}
        </Text>
        <ProjectValidationStatus
          isClient={get(viewer, "isClient")}
          status={project.validationStatus}
        />
      </Modal.Header>
      <Modal.Body>
        {get(viewer, "isSpecialist") && project.validationStatus === "Pending" && (
          <Box mb="m">
            <ProjectValidationPrompt project={project} />
          </Box>
        )}
        <Spacing paddingBottom="s">
          {clientDescription && (
            <>
              <Heading level={6}>Client Description</Heading>
              <Text size="s" marginBottom="l">
                {clientDescription}
              </Text>
            </>
          )}

          {requirements && (
            <>
              <Heading level={6}>Requirements</Heading>
              <Text size="s" marginBottom="l">
                {requirements}
              </Text>
            </>
          )}

          <Heading level={6}>Project Description</Heading>
          <Text fontSize="s" lineHeight="s" color="neutral.7">
            {renderLineBreaks(project.description)}
          </Text>

          {project.results && (
            <>
              <Heading level={6}>Results</Heading>
              <Text size="s" mt="l" marginBottom="l">
                {project.results}
              </Text>
            </>
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

export default ProjectDetails;
