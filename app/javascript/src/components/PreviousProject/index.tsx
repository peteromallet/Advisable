import * as React from "react";
import { get } from "lodash";
import useViewer from "../../hooks/useViewer";
import Flex from "../Flex";
import Spacing from "../Spacing";
import StarRating from "../StarRating";
import { useMobile } from "../Breakpoint";
import ProjectValidationStatus from "../ProjectValidationStatus";
import PreviousProjectModal from "../PreviousProjectModal";
import { PreviousProject, ProjectTitle, ProjectDescription } from "./styles";

export default function PreviousProjectContainer({
  specialistId,
  previousProject,
}) {
  const viewer = useViewer();
  const [isOpen, setOpen] = React.useState(false);
  const isMobile = useMobile();
  const { project, reviews } = previousProject;

  return (
    <React.Fragment>
      <PreviousProjectModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id={project.airtableId}
        type={project.__typename}
        specialistId={specialistId}
      />

      <PreviousProject onClick={() => setOpen(true)}>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.excerpt}</ProjectDescription>
        <Flex align="center">
          {!isMobile && (
            <Spacing paddingRight="s">
              <ProjectValidationStatus
                isClient={get(viewer, "isClient")}
                status={project.validationStatus}
              />
            </Spacing>
          )}
          {reviews.length > 0 && (
            <StarRating rating={reviews[0].ratings.overall} />
          )}
        </Flex>
      </PreviousProject>
    </React.Fragment>
  );
}
