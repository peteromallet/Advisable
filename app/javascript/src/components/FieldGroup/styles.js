import styled, { css } from "styled-components";

const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 20,
  xl: 32,
  xxl: 52,
};

export const FieldGroup = styled.div`
  display: flex;
  flex-wrap: none;
  ${(props) =>
    props.spacing &&
    css`
      margin-left: -${SPACING[props.spacing]}px;
    `};
`;

export const FieldGroupItem = styled.div`
  flex: 1 0 0%;
  ${(props) =>
    props.spacing &&
    css`
      margin-left: ${SPACING[props.spacing]}px;
    `};
`;

export default FieldGroup;
