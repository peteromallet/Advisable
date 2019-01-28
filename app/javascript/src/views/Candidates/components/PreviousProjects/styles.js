import styled, { css } from "styled-components";

export const PreviousProject = styled.div`
  padding: 15px;
  background: #f2f3f7;
  border-radius: 10px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;

      &:hover {
        background: #e8eaf2;
      }
    `};
`;

export const ProjectTitle = styled.h4`
  color: #0a1745;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 2px;
`;

export const ProjectDescription = styled.p`
  color: #5c637e;
  font-size: 15px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 8px;
`;
