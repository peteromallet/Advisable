import styled from "styled-components";
import { theme } from "@advisable/donut";

export const PreviousProject = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProjectTitle = styled.a`
  color: ${theme.colors.neutral[7]};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.blue[5]};
  }
`;
