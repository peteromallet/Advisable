import React from "react";
import { Plus } from "@styled-icons/heroicons-outline";
import { margin } from "styled-system";
import styled from "styled-components";
import { theme } from "@advisable/donut";
import {
  Circle,
  Text,
  StyledText,
  StyledCircle,
  DialogDisclosure,
} from "@advisable/donut";

const StyledNewProject = styled.button`
  appearance: none;
  background: transparent;
  width: 100%;
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
      <Circle size={40} bg="blue800" mr="s" color="white.9">
        <Plus size={24} strokeWidth={2} />
      </Circle>
      <Text color="blue700">Add a previous project</Text>
    </DialogDisclosure>
  );
}
