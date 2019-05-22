import styled, { css } from "styled-components";
import SPACING from "../Spacing/sizes";

export const FieldGroup = styled.div`
  display: flex;
  flex-wrap: none;
  ${props =>
    props.spacing &&
    css`
      margin-left: -${SPACING[props.spacing]}px;
    `};
`;

export const FieldGroupItem = styled.div`
  flex: 1 0 0%;
  ${props =>
    props.spacing &&
    css`
      margin-left: ${SPACING[props.spacing]}px;
    `};
`;

export default FieldGroup;
