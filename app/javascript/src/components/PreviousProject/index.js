import * as React from "react";
import { get } from "lodash";
import useViewer from "../../hooks/useViewer";
import { DialogDisclosure } from "reakit/Dialog";
import { useModal, Box } from "@advisable/donut";
import Flex from "../Flex";
import StarRating from "../StarRating";
import { useMobile } from "../Breakpoint";
import ProjectValidationStatus from "../ProjectValidationStatus";
import PreviousProjectDetails from "../PreviousProjectDetails";
import { PreviousProject, ProjectTitle, ProjectDescription } from "./styles";

export default function PreviousProjectContainer({
  previousProject,
  modalProps,
}) {
  const viewer = useViewer();
  const modal = useModal();
  const isMobile = useMobile();
  const project = previousProject;
  const reviews = project.reviews;

  return (
    <>
      <PreviousProjectDetails.Modal
        modal={modal}
        id={project.id}
        label={project.title}
        {...modalProps}
      />

      <DialogDisclosure as={PreviousProject} onClick={modal.show}>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.excerpt}</ProjectDescription>
        <Flex align="center">
          {!isMobile && (
            <Box paddingRight="s">
              <ProjectValidationStatus
                isClient={get(viewer, "isClient")}
                status={project.validationStatus}
              />
            </Box>
          )}
          {reviews.length > 0 && (
            <StarRating rating={reviews[0].ratings.overall} />
          )}
        </Flex>
      </DialogDisclosure>
    </>
  );
}
