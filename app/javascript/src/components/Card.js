import styled, { css } from "styled-components";
import { withSpacing } from "./Spacing";

const Card = styled.div`
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 4px 10px 0 rgba(208, 217, 233, 0.38);

  ${props =>
    props.onClick &&
    css`
      transition: box-shadow 200ms;

      &:hover {
        cursor: pointer;
        box-shadow: 0 4px 20px 0 rgba(208, 217, 233, 0.8);
      }
    `};
`;

Card.Section = styled.div`
  padding: 25px;
`;

export default withSpacing(Card);
