import styled, { css } from "styled-components";
import { rgba } from "polished";
import { withSpacing } from "./Spacing";
import colors from "../colors";

const ELEVATIONS = {
  1: css`
    box-shadow: 0 2px 6px -2px ${rgba(colors.neutral.s4, 0.5)};
  `,
  2: css`
   box-shadow: 0 6px 18px -6px ${rgba(colors.neutral.s4, 0.6)};
  `,
  3: css`
    box-shadow: 0 10px 25px -10px ${rgba(colors.neutral.s4, 0.6)};
   `
};

export const Card = styled.div`
  background: #ffffff;
  border-radius: 3px;
  position: relative;
  box-shadow: 0 4px 10px 0 rgba(208, 217, 233, 0.38);

  ${props =>
    props.center &&
    css`
      text-align: center;
    `}

  ${props =>
    props.onClick &&
    css`
      transition: box-shadow 200ms;

      &:hover {
        cursor: pointer;
        box-shadow: 0 4px 20px 0 rgba(208, 217, 233, 0.8);
      }
    `};

  ${props => ELEVATIONS[props.elevation]};
  
  ${props =>
    props.hoverElevation &&
    css`
      transition: box-shadow 300ms, transform 300ms;

      &:hover {
        cursor: pointer;
        transform: translateY(-1px);
        ${props => ELEVATIONS[props.hoverElevation]};
      }
    `};
`;

Card.Section = styled.div`
  padding: 25px;
`;

export default withSpacing(Card);
