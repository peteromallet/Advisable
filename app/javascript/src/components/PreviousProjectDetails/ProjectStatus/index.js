import React from "react";
import { Exclamation } from "@styled-icons/heroicons-outline/Exclamation";
import { EyeOff } from "@styled-icons/ionicons-outline/EyeOff";
import { CheckCircle } from "@styled-icons/feather/CheckCircle";
import CopyURL from "src/components/CopyURL";
import Review from "src/components/Review";
import DeleteProjectDialog from "../ProjectActions/DeleteProjectDialog";
import { Circle, DialogDisclosure, useDialogState } from "@advisable/donut";
import {
  StyledProjectStatusSection,
  StyledPromptBox,
  StyledTextWrapper,
  StyledTitle,
  StyledDescription,
  StyledURLWrapper,
  StyledButtonsWrapper,
  StyledButton,
} from "./styles";

function Draft({ project, modal }) {
  return (
    <StyledProjectStatusSection>
      <StyledPromptBox color="neutral">
        <Circle>
          <EyeOff />
        </Circle>
        <StyledTextWrapper>
          <StyledTitle>Draft Project</StyledTitle>
          <StyledDescription>
            This project has not been published and will not be visible on your
            profile. Continue editing to post it to your profile.
          </StyledDescription>
        </StyledTextWrapper>
        <StyledButtonsWrapper>
          <DialogDisclosure
            as={StyledButton}
            {...modal.atPath(`/previous_projects/${project.id}`)}
          >
            Continue
          </DialogDisclosure>
        </StyledButtonsWrapper>
      </StyledPromptBox>
    </StyledProjectStatusSection>
  );
}

export function Pending({ project }) {
  const name = project.contactFirstName || project.contactJobTitle;

  return (
    <StyledProjectStatusSection>
      <StyledPromptBox color="yellow">
        <Circle>
          <EyeOff strokeWidth={1.75} />
        </Circle>
        <StyledTextWrapper>
          <StyledTitle>Verification required</StyledTitle>
          <StyledDescription>
            Please send the following verification URL to {name} from{" "}
            {project.clientName} so they can verify the project.
          </StyledDescription>
        </StyledTextWrapper>
        <StyledURLWrapper>
          <CopyURL bg="white">{`${location.origin}/verify_project/${project.id}`}</CopyURL>
        </StyledURLWrapper>
      </StyledPromptBox>
    </StyledProjectStatusSection>
  );
}

function ValidationFailed({ project, modal, onDelete }) {
  const deleteModal = useDialogState();
  return (
    <StyledProjectStatusSection>
      <StyledPromptBox color="red">
        <Circle>
          <Exclamation />
        </Circle>
        <StyledTextWrapper>
          <StyledTitle>Validation Failed</StyledTitle>
          <StyledDescription>
            Unfortunately the client was unable to verify this project. It will
            not be visible to others until it is validated. You can update the
            project and request validation again or remove the project.
          </StyledDescription>
        </StyledTextWrapper>
        <StyledButtonsWrapper>
          <DeleteProjectDialog
            modal={deleteModal}
            onDelete={onDelete}
            project={project}
          />
          <DialogDisclosure
            as={StyledButton}
            {...modal.atPath(`/previous_projects/${project.id}`)}
          >
            Update
          </DialogDisclosure>
          <DialogDisclosure as={StyledButton} {...deleteModal}>
            Delete
          </DialogDisclosure>
        </StyledButtonsWrapper>
      </StyledPromptBox>
    </StyledProjectStatusSection>
  );
}

export function NoReviews({ project }) {
  return (
    <StyledProjectStatusSection>
      <StyledPromptBox color="neutral">
        <Circle>
          <CheckCircle strokeWidth={2} />
        </Circle>
        <StyledTextWrapper>
          <StyledTitle>Project has been verified but not reviewed</StyledTitle>
          <StyledDescription>
            The client verified this project but has not provided a review. You
            can ask the client to leave a review using the link below.
          </StyledDescription>
        </StyledTextWrapper>
        <StyledURLWrapper>
          <CopyURL bg="white">{`${location.origin}/verify_project/${project.id}`}</CopyURL>
        </StyledURLWrapper>
      </StyledPromptBox>
    </StyledProjectStatusSection>
  );
}

export function Validated({ project }) {
  const review = project.reviews?.[0];
  const hasComment = review?.comment;

  if (!hasComment) return null;

  return (
    <StyledProjectStatusSection>
      <Review review={review} size={{ _: "s", m: "m", l: "s" }} />
    </StyledProjectStatusSection>
  );
}

function ProjectStatus({ project, modal, viewerIsOwner, ...props }) {
  let status;
  if (project.draft) {
    status = "Draft";
  } else if (
    project.validationStatus === "Validated" &&
    !project.reviews?.length
  ) {
    status = "No Reviews";
  } else if (project.validationStatus) {
    status = project.validationStatus;
  }

  switch (status) {
    case "Validated": {
      return <Validated project={project} />;
    }
    case "No Reviews": {
      if (!viewerIsOwner) return null;
      return <NoReviews project={project} />;
    }
    case "Pending": {
      if (!viewerIsOwner) return null;
      return <Pending project={project} />;
    }
    case "Draft": {
      if (!viewerIsOwner) return null;
      return <Draft project={project} modal={modal} {...props} />;
    }
    case "Validation Failed": {
      if (!viewerIsOwner) return null;
      return <ValidationFailed project={project} modal={modal} {...props} />;
    }
    default: {
      return null;
    }
  }
}

export default ProjectStatus;
