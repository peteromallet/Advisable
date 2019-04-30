import React from "react";
import Loading from "./Loading";
import PreviousProject from "./PreviousProject";
import Card from "../Card";
import Button from "../Button";
import Divider from "../Divider";
import Heading from "../Heading";
import { Padding } from "../Spacing";
import PreviousProjectsModal from "../PreviousProjectsModal";

export default ({
  loading,
  title,
  showValidationStatus,
  previousProjects,
  specialistId,
  hasMoreProjects,
}) => {
  const [viewAllProjects, setViewAllProjects] = React.useState(
    !hasMoreProjects
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      {title && (
        <>
          <Padding left="xl" top="l" bottom="l">
            <Heading level={4}>{title}</Heading>
          </Padding>
          <Divider />
        </>
      )}
      {previousProjects.map(previousProject => (
        <PreviousProject
          specialistId={specialistId}
          key={previousProject.project.id}
          previousProject={previousProject}
          showValidationStatus={showValidationStatus}
        />
      ))}
      {hasMoreProjects && (
        <React.Fragment>
          <PreviousProjectsModal
            isOpen={viewAllProjects}
            onClose={() => setViewAllProjects(false)}
            specialistId={specialistId}
          />
          <Padding size="xl">
            <Button
              block
              size="l"
              styling="outlined"
              onClick={() => setViewAllProjects(true)}
            >
              View all projects
            </Button>
          </Padding>
        </React.Fragment>
      )}
    </Card>
  );
};
