import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { Circle, theme } from "@advisable/donut";
import { CheckCircle } from "@styled-icons/feather/CheckCircle";

export const StyledIcon = (props) => <Circle size={40} {...props} />;

const color = variant({
  prop: "color",
  variants: {
    grey: {},
    yellow: {},
    blue: {},
    red: {},
  },
});

export const StyledProjectStatus = styled.div`
  ${color}

  /* grid */
  display: grid;
  grid-template-columns: 40px auto;
  grid-template-rows: 40px auto;
  grid-template-areas:
    "icon text"
    "icon cta";

  /* border */
  border-top: 1px solid;
  border-top-color: ${theme.colors.neutral100};

  /* spacing */
  margin-top: ${theme.space[5]};
  padding-top: ${theme.space[6]};
  padding-bottom: ${theme.space[2]};
`;

export default function Prompt() {
  return (
    <StyledProjectStatus>
      <StyledIcon>
        <CheckCircle strokeWidth={2} />
      </StyledIcon>
    </StyledProjectStatus>
  );
}
