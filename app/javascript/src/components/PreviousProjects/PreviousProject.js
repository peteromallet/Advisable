import React, { useState } from "react";
import { get } from "lodash";
import { Link, Text, Box, RoundedButton } from "@advisable/donut";
import Review from "src/components/Review";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import ProjectValidationStatus from "src/components/ProjectValidationStatus";
import ProjectValidationPrompt from "../ProjectValidationPrompt";
import useViewer from "../../hooks/useViewer";

const PreviousProject = ({
  showValidationStatus = true,
  previousProject,
  specialistId,
}) => {
  const viewer = useViewer();
  const [isOpen, setOpen] = useState(false);
  const { reviews } = previousProject;
  const project = previousProject;

  const openProject = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <PreviousProjectModal
        id={project.id}
        isOpen={isOpen}
        specialistId={specialistId}
        onClose={() => setOpen(false)}
      />
      <Box py="l">
        <Text as="h4" fontWeight="medium" fontSize="l" mb="xs">
          <Link.External variant="dark" href="#" onClick={openProject}>
            {project.title}
          </Link.External>
        </Text>

        {showValidationStatus && (
          <Box marginBottom="m">
            <ProjectValidationStatus
              isClient={get(viewer, "isClient")}
              status={project.validationStatus}
            />
          </Box>
        )}

        {get(viewer, "isSpecialist") && project.validationStatus === "Pending" && (
          <Box mb="m">
            <ProjectValidationPrompt project={project} />
          </Box>
        )}

        {project.excerpt && (
          <Text mb="m" fontSize="s" lineHeight="m" color="neutral800">
            {project.excerpt}
          </Text>
        )}
        {reviews && reviews.length > 0 && (
          <Box paddingBottom="xl">
            {reviews.map((review) => (
              <Review
                key={review.id}
                review={review}
                companyName={companyName(project)}
              />
            ))}
          </Box>
        )}
        <RoundedButton size="s" variant="subtle" onClick={openProject}>
          View project details
        </RoundedButton>
      </Box>
      <Box height={1} bg="neutral100" />
    </>
  );
};

export default PreviousProject;
