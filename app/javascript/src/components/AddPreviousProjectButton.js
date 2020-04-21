import React from "react";
import { margin } from "styled-system";
import styled from "styled-components";
import { theme } from "@advisable/donut";
import {
  Circle,
  Text,
  StyledText,
  StyledCircle,
  DialogDisclosure,
  Icon,
} from "@advisable/donut";

const StyledNewProject = styled.div`
  ${margin};
  padding: 16px;
  outline: none;
  display: flex;
  cursor: default;
  align-items: center;
  border-radius: 12px;
  border: 2px dashed ${theme.colors.neutral200};

  &:hover {
    cursor: pointer;
    border-color: ${theme.colors.neutral300};
  }

  &:hover ${StyledCircle} {
    background: ${theme.colors.blue900};
  }

  &:hover ${StyledText} {
    color: ${theme.colors.blue800};
  }
`;

export default function AddPreviousProjectButton({ modal, ...props }) {
  return (
    <DialogDisclosure
      {...modal}
      as={StyledNewProject}
      {...props}
      aria-label="Add a previous project"
    >
      <Circle size={40} bg="blue800" mr="s">
        <Icon icon="plus" color="white.9" />
      </Circle>
      <Text color="blue700">Add a previous project</Text>
    </DialogDisclosure>
  );
}
