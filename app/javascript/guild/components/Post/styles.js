import styled, { css } from "styled-components";
import { Card, theme } from "@advisable/donut";

export const CoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

export const StyledPostCard = styled(Card)`
  width: 100%;
  position: relative;
  border-radius: 12px;
  border: 2px solid white;

  ${({ pinned }) =>
    pinned &&
    css`
      border-color: ${theme.colors.neutral400};
    `}
  ${({ popular, pinned }) =>
    popular &&
    !pinned &&
    css`
      border-right: 0;
      border-left: 0;
      border-bottom: 6px solid #fde7b2;
    `}
  }
`;
