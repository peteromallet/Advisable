import React from "react";
import { isObject } from "lodash";
import { Link } from "react-router-dom";
import { DialogDisclosure } from "reakit/Dialog";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import {
  Box,
  Card,
  Icon,
  Text,
  Modal,
  useModal,
  RoundedButton,
} from "@advisable/donut";
import ProjectDetails from "../ProjectDetails";
import IndustryTag from "../../../components/IndustryTag";

function useRoutedModal(path, back) {
  const modal = useModal();
  const history = useHistory();

  const pathname = isObject(path) ? path.pathname : path;
  const match = useRouteMatch(pathname);

  React.useEffect(() => {
    if (match && !modal.visible) {
      modal.show();
    }

    if (!match && modal.visible) {
      modal.hide();
    }
  }, [match]);

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
  const location = useLocation();

  const modal = useRoutedModal(
    {
      ...location,
      pathname: `/freelancers/${specialistId}/projects/${project.id}`,
    },
    {
      ...location,
      pathname: `/freelancers/${specialistId}/projects`,
    }
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
        <Modal modal={modal} label="Freelancer project" width={800}>
          <Box padding="xl">
            <ProjectDetails
              specialistId={specialistId}
              projectId={project.id}
            />
            <RoundedButton
              size="l"
              as={Link}
              to={`/request_consultation/${specialistId}`}
              prefix={<Icon icon="message-circle" />}
            >
              Request Consultation
            </RoundedButton>
          </Box>
        </Modal>
        <DialogDisclosure as={RoundedButton} {...modal} variant="subtle">
          View Project
        </DialogDisclosure>
      </Box>
    </Card>
  );
}

export default ProjectCard;
