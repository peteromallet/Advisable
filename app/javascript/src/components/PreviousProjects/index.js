import Loading from "./Loading";
import PreviousProject from "./PreviousProject";
import { Box, Text, useModal, Button } from "@advisable/donut";
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
  const modal = useModal();

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
          <PreviousProjectsModal modal={modal} specialistId={specialistId} />
          <Box py="l">
            <Button width="100%" size="l" variant="subtle" onClick={modal.show}>
              View all projects
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default PreviousProjects;
