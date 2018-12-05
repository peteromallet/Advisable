// The Container component is used to create the containing layout for a page.

import styled, { css } from "styled-components";

const sizes = {
  s: css`
    max-width: 500px;
  `,
  m: css`
    max-width: 700px;
  `,
  l: css`
    max-width: 1110px;
  `
};

const Container = styled.div`
  width: 100%;
  margin: 50px auto;

  ${props => sizes[props.size || 'l']}
`;

export default Container;
