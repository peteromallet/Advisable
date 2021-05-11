import React from "react";
import useViewer from "src/hooks/useViewer";
import { useQuery } from "@apollo/client";
import { Modal, Avatar, Box, Text, Tag, Paragraph } from "@advisable/donut";
import GET_PROJECT from "./getProject";
import ImageGallery, { useImageGallery } from "src/components/ImageGallery";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import ProjectDetailsLoading from "./ProjectDetailsLoading";
import { StyledImageThumbnail } from "./styles";
import ProjectActions from "./ProjectActions";
import ProjectStatus from "./ProjectStatus";
import PreviousProjectFormModal, {
  usePreviousProjectModal,
} from "src/components/PreviousProjectFormModal";

function PreviousProjectDetails({ detailsModal, id }) {
  const viewer = useViewer();
  const gallery = useImageGallery();
  const modal = usePreviousProjectModal("/previous_projects/new");
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: {
      id: id,
    },
  });

  if (loading) return <ProjectDetailsLoading />;
  if (error) return <Text>Failed to load project, please try again.</Text>;

  const project = data.previousProject;
  const viewerIsOwner = project.specialist.id === viewer?.id;

  const cover = project.images.find((i) => i.cover);
  const otherImages = project.images.filter((i) => !i.cover);

  return (
    <>
      <PreviousProjectFormModal
        modal={modal}
        specialistId={project.specialist.id}
      />
      <Box mb="m" width="80%">
        <Text
          as="h2"
          fontSize="4xl"
          color="neutral900"
          lineHeight="30px"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          {project.title}
        </Text>
      </Box>
      {cover ? (
        <Box mb="6">
          <ImageGallery dialog={gallery} images={project.images} />
          <StyledImageThumbnail
            height="350px"
            marginBottom="2"
            onClick={() => gallery.open(0)}
            style={{ backgroundImage: `url("${cover.url}")` }}
          />
          {otherImages.length > 0 ? (
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
              gridGap="8px"
            >
              {otherImages.map((i, index) => (
                <StyledImageThumbnail
                  key={i.id}
                  height="100px"
                  max-width="140px"
                  onClick={() => gallery.open(index)}
                  style={{ backgroundImage: `url("${i.url}")` }}
                />
              ))}
            </Box>
          ) : null}
        </Box>
      ) : null}
      <Box height={1} bg="neutral100" mb="m" />
      <Box mb="m" display="flex" alignItems="center">
        <Box flexShrink={0} mr="s">
          <Avatar
            size="s"
            name={project.specialist.name}
            url={project.specialist.avatar}
          />
        </Box>
        <Box>
          <Text mb="1px" color="neutral900" fontWeight="medium">
            {project.specialist.name}
          </Text>
          <Text mt="1px" color="neutral500" fontSize="s">
            {project.specialist.location}
          </Text>
        </Box>
        <Box ml="auto">
          <ProjectActions
            onDelete={detailsModal.hide}
            project={project}
            editModal={modal}
            size="md"
          />
        </Box>
      </Box>
      <Box height={1} bg="neutral100" mb="l" />
      {project.description && (
        <>
          <Text
            mb="xs"
            fontSize="lg"
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.01em"
          >
            Project description
          </Text>
          <Paragraph mb="xl">{renderLineBreaks(project.description)}</Paragraph>
        </>
      )}
      <Box display={["block", "flex"]}>
        <Box width="100%">
          <Text
            mb="xs"
            fontSize="lg"
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.01em"
          >
            Skills Used
          </Text>
          <Box mb={["s", 0]}>
            {project.skills.map((skill) => (
              <Tag key={skill.id} mr="xxs" mb="xxs" variant="blue">
                {skill.name}
              </Tag>
            ))}
          </Box>
        </Box>
        <Box width="100%">
          <Text
            mb="xs"
            fontSize="lg"
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.01em"
          >
            Industries
          </Text>
          <Box>
            {project.industries.map((industry) => (
              <Tag key={industry.id} mr="xxs" mb="xxs" variant="cyan">
                {industry.name}
              </Tag>
            ))}
          </Box>
        </Box>
      </Box>
      <ProjectStatus
        project={project}
        modal={modal}
        onDelete={detailsModal.hide}
        viewerIsOwner={viewerIsOwner}
      />
      {viewerIsOwner ? (
        <>
          <Box
            mt={4}
            mb={8}
            height="1px"
            width="200px"
            mx="auto"
            bg="neutral100"
          />
          <Box display="flex" justifyContent="center" pb={6}>
            <ProjectActions
              onDelete={detailsModal.hide}
              project={project}
              editModal={modal}
              size={{ _: "lg", md: "xl" }}
            />
          </Box>
        </>
      ) : null}
    </>
  );
}

PreviousProjectDetails.Modal = function PreviousProjectDetailsModal({
  modal,
  id,
  ...props
}) {
  return (
    <Modal
      modal={modal}
      width={800}
      padding="xl"
      label="Previous Project Details"
      {...props}
    >
      <PreviousProjectDetails detailsModal={modal} id={id} />
    </Modal>
  );
};

export default PreviousProjectDetails;
