import React from "react";
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
  padding: 16px;
  outline: none;
  display: flex;
  cursor: default;
  align-items: center;
  border-radius: 12px;
  border: 2px dashed ${theme.colors.neutral100};

  &:hover {
    cursor: pointer;
    border-color: ${theme.colors.neutral200};
  }

  &:hover ${StyledCircle} {
    background: ${theme.colors.blue600};
  }

  &:hover ${StyledText} {
    color: ${theme.colors.blue800};
  }
`;

export default function NewProject({ modal }) {
  return (
    <DialogDisclosure {...modal} as={StyledNewProject}>
      <Circle size={40} bg="blue500" mr="s">
        <Icon icon="plus" color="white.9" />
      </Circle>
      <Text color="blue700">Add a previous project</Text>
    </DialogDisclosure>
  );
}
