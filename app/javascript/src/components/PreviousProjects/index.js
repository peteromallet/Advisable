import React from "react";
import Loading from "./Loading";
import PreviousProject from "./PreviousProject";
import { Box, Text } from "@advisable/donut";
import Button from "../Button";
import Divider from "../Divider";
import PreviousProjectsModal from "../PreviousProjectsModal";

const PreviousProjects = ({
  loading,
  title,
  showValidationStatus,
  previousProjects,
  specialistId,
  hasMoreProjects,
}) => {
  const [viewAllProjects, setViewAllProjects] = React.useState(
    !hasMoreProjects,
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {title && (
        <>
          <Text as="h4">{title}</Text>
          <Divider />
        </>
      )}
      {previousProjects.map((previousProject) => (
        <PreviousProject
          key={previousProject.id}
          previousProject={previousProject}
          showValidationStatus={showValidationStatus}
        />
      ))}
      {hasMoreProjects && (
        <>
          <PreviousProjectsModal
            isOpen={viewAllProjects}
            onClose={() => setViewAllProjects(false)}
            specialistId={specialistId}
          />
          <Box padding="xl">
            <Button
              block
              size="l"
              styling="outlined"
              onClick={() => setViewAllProjects(true)}
            >
              View all projects
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default PreviousProjects;
