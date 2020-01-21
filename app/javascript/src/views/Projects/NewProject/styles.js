import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const StyledNewProjectIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  position: relative;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    width: 100%;
    z-index: -1;
    height: 100%;
    background: white;
    border-radius: 50%;
    position: absolute;
    transition: background 700ms, transform 700ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1.6);
    box-shadow: 0 2px 8px ${rgba(theme.colors.neutral[9], 0.1)};
  }
`;

export const StyledNewProject = styled.div`
  width: 100%;
  height: 280px;
  font-size: 15px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 2px;
  text-align: center;
  position: relative;
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  letter-spacing: -0.01em;
  color: ${theme.colors.neutral[7]};
  border: 2px dashed ${theme.colors.neutral[3]};

  &:hover {
    color: ${theme.colors.blue[8]};
    border-color: ${theme.colors.neutral[4]};

    ${StyledNewProjectIcon} {
      color: white;

      &::before {
        transform: scale(1.1);
        background: ${theme.colors.blue[8]};
        box-shadow: 0 4px 12px ${rgba(theme.colors.neutral[9], 0.1)};
      }

      div {
        transform: translateY(-60px);
      }
    }
  }
`;
