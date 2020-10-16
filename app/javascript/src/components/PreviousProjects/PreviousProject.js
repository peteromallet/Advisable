import { get } from "lodash-es";
import {
  Modal,
  useModal,
  Link,
  Text,
  Box,
  Button,
  DialogDisclosure,
} from "@advisable/donut";
import Review from "src/components/Review";
import ProjectValidationStatus from "src/components/ProjectValidationStatus";
import ProjectValidationPrompt from "../ProjectValidationPrompt";
import useViewer from "../../hooks/useViewer";
import PreviousProjectDetails from "../../components/PreviousProjectDetails";

const PreviousProject = ({ showValidationStatus = true, previousProject }) => {
  const modal = useModal();
  const viewer = useViewer();
  const { reviews } = previousProject;
  const project = previousProject;

  return (
    <>
      <Modal modal={modal} label={project.title} width={800} padding="xl">
        <PreviousProjectDetails id={project.id} />
      </Modal>
      <Box py="l">
        <Text as="h4" fontWeight="medium" fontSize="l" mb="xs">
          <Link.External variant="dark" href="#" onClick={modal.show}>
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
                companyName={project.clientName}
              />
            ))}
          </Box>
        )}
        <DialogDisclosure
          as={Button}
          size="s"
          variant="subtle"
          onClick={modal.show}
        >
          View project details
        </DialogDisclosure>
      </Box>
      <Box height={1} bg="neutral100" />
    </>
  );
};

export default PreviousProject;
