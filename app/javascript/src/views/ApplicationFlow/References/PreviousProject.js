import * as React from "react";
import styled from "styled-components";
import {
  Card,
  Text,
  Box,
  Columns,
  Button,
  DialogDisclosure,
  theme,
} from "@advisable/donut";
import { rgba } from "polished";
import tick from "./tick.svg";

const Label = styled.label`
  padding: 24px;
  display: block;
  position: relative;
  padding-left: 60px;
  border-radius: 2px;
  border: 2px solid transparent;
`;

const Checkbox = styled.div`
  top: 50%;
  left: 20px;
  width: 24px;
  height: 24px;
  position: absolute;
  border-radius: 50%;
  transform: translateY(-50%);
  border: 2px solid ${rgba("#222842", 0.27)};
`;

const Input = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);

  &:checked + ${Label} ${Checkbox} {
    border-color: ${theme.colors.blue500};
    background: ${theme.colors.blue500} url(${tick}) no-repeat center;
  }

  &[disabled] + ${Label} ${Checkbox} {
    opacity: 0.4;
  }

  &:not([disabled]) + ${Label} {
    cursor: pointer;
  }
`;

function Publish({ modal, id }) {
  return (
    <DialogDisclosure
      size="s"
      as={Button}
      variant="dark"
      {...modal.atPath(`/previous_projects/${id}`)}
    >
      Publish
    </DialogDisclosure>
  );
}

const PreviousProject = ({ project, projectModal, ...props }) => {
  return (
    <Card>
      <Input type="checkbox" id={project.id} {...props} />
      <Label htmlFor={project.id} data-testid={project.id}>
        <Checkbox />
        <Text color="blue900" fontWeight="medium">
          {project.title}
        </Text>
        {project.draft && (
          <>
            <Box bg="orange100" borderRadius="12px" mt="s" padding="m">
              <Columns align="center">
                <Columns.Column expand>
                  <Text mb="xxs" fontWeight="medium">
                    Project not published
                  </Text>
                  <Text color="neutral700">
                    You must publish this project before you can use it as a
                    reference.
                  </Text>
                  <Box mt="s" display={{ _: "block", m: "none" }}>
                    <Publish modal={projectModal} id={project.id} />
                  </Box>
                </Columns.Column>
                <Box display={{ _: "none", m: "block" }}>
                  <Publish modal={projectModal} id={project.id} />
                </Box>
              </Columns>
            </Box>
          </>
        )}
      </Label>
    </Card>
  );
};

export default PreviousProject;
