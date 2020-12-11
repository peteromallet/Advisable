import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";

export const StyledYourPost = styled(GuildBox)`
  ${({ draft }) =>
    draft &&
    css`
      opacity: 0.6;
      border: 2px dashed ${theme.colors.slateBlue};
    `}
`;

export const StyledStatus = styled(GuildBox)`
  user-select: none;
  outline: none;
  position: absolute;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  flex-grow: 0;
  align-items: center;
  width: 100px;
  margin-left: -50px;
  top: -15px;
  left: 50%;
  padding: 0 12px;
  height: 30px;
  z-index: 1;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02rem;
  background: ${theme.colors.slateBlue};
  color: white;
  cursor: pointer;

  &:hover {
    filter: brightness(85%);
  }
`;
