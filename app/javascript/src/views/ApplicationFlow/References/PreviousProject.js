import * as React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import tick from "./tick.svg";

const Wrapper = styled.div`
  margin-bottom: 8px;
  position: relative;
  user-select: none;
`;

const Label = styled.label`
  padding: 20px;
  display: block;
  cursor: pointer;
  padding-left: 60px;
  border-radius: 10px;
  background: rgba(29, 39, 75, 0.06);

  &:hover {
    background: rgba(29, 39, 75, 0.1);
  }
`;

const Checkbox = styled.div`
  top: 50%;
  left: 20px;
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 10px;
  transform: translateY(-50%);
  border: 2px solid ${rgba("#222842", 0.27)};
`;

const Title = styled.span`
  color: #323a57;
  display: block;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Description = styled.span`
  color: #4d5778;
  font-size: 14px;
`;

const Input = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);

  &:checked + ${Label} ${Checkbox} {
    border-color: #173fcd;
    background: #173fcd url(${tick}) no-repeat center;
  }
`;

const PreviousProject = ({ project, ...props }) => {
  return (
    <Wrapper>
      <Input type="checkbox" id={project.id} {...props} />
      <Label htmlFor={project.id} data-testid={project.id}>
        <Checkbox />
        <Title>{project.title}</Title>
        <Description>{project.excerpt}</Description>
      </Label>
    </Wrapper>
  );
};

export default PreviousProject;
