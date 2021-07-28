import styled from "styled-components";
import { space, position, variant } from "styled-system";

export const StyledIconButtonCircle = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms, color 200ms;
`;

export const StyledIconButtonLabel = styled.span`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const size = variant({
  prop: "size",
  variants: {
    sm: {
      [StyledIconButtonCircle]: {
        width: "32px",
        height: "32px",
        svg: {
          width: "16px",
          height: "16px",
        },
      },
    },
    md: {
      [StyledIconButtonCircle]: {
        width: "40px",
        height: "40px",
        svg: {
          width: "20px",
          height: "20px",
        },
      },
    },
  },
});

const variants = variant({
  variants: {
    subtle: {
      [StyledIconButtonCircle]: {
        color: "blue900",
        bg: "neutral100",
      },
      [StyledIconButtonLabel]: {
        color: "neutral800",
      },
      "&:hover": {
        [StyledIconButtonCircle]: {
          color: "neutral600",
          bg: "neutral200",
        },
        [StyledIconButtonLabel]: {
          color: "neutral600",
        },
      },
    },
    yellow: {
      [StyledIconButtonCircle]: {
        color: "yellow900",
        bg: "yellow100",
      },
      [StyledIconButtonLabel]: {
        color: "neutral800",
      },
      "&:hover": {
        [StyledIconButtonCircle]: {
          color: "yellow800",
          bg: "yellow200",
        },
        [StyledIconButtonLabel]: {
          color: "neutral600",
        },
      },
    },
  },
});

export const StyledIconButton = styled.button`
  ${size}
  ${space}
  ${position}
  ${variants}

  border: none;
  outline: none;
  appearance: none;
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
`;
