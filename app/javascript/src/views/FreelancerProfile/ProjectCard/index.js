import React from "react";
import IndustryTag from "../../../components/IndustryTag";
import { DialogDisclosure } from "reakit/Dialog";
import { useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  Modal,
  useModal,
  RoundedButton,
} from "@advisable/donut";
import ProjectDetails from "../ProjectDetails";

function useRoutedModal(path, back) {
  const modal = useModal();
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {}, []);

  return {
    ...modal,
    toggle: () => {
      history.push(path);
      modal.toggle();
    },
    show: () => {
      history.push(path);
      modal.show();
    },
    hide: () => {
      history.push(back);
      modal.hide();
    },
  };
}

function ProjectCard({ specialistId, project }) {
  const modal = useRoutedModal(
    `/freelancers/${specialistId}/projects/${project.id}`,
    `/freelancers/${specialistId}`
  );

  return (
    <Card>
      <Box padding="l">
        <IndustryTag industry={project.industry} mb="s" />
        <Text
          mb="s"
          fontSize="xxl"
          color="blue900"
          fontWeight="semibold"
          letterSpacing="-0.02em"
        >
          {project.title}
        </Text>
        <Text fontSize="xs" color="neutral700" lineHeight="xs">
          {project.excerpt}
        </Text>
        <Box mt="l" mb="l">
          {project.skills.map(skill => (
            <Box
              mr="xxs"
              mb="xxs"
              px="12px"
              height="26px"
              key={skill.id}
              fontSize="xxs"
              bg="neutral100"
              color="neutral800"
              borderRadius="15px"
              alignItems="center"
              display="inline-flex"
            >
              {skill.name}
            </Box>
          ))}
        </Box>
        <Modal modal={modal}>
          <ProjectDetails id={project.id} />
          <RoundedButton>test</RoundedButton>
        </Modal>
        <DialogDisclosure as={RoundedButton} {...modal} variant="subtle">
          View Project
        </DialogDisclosure>
      </Box>
    </Card>
  );
}

export default ProjectCard;
