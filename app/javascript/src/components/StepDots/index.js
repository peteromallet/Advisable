import React from "react";
import { times } from "lodash";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: ${props => props.justify || "center"};
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  margin: 0 3px;
  border-radius: 3px;
  background: #d3d9e9;

  ${props =>
    props.active &&
    css`
      background-color: #00cdb4;
    `}
`;

export default ({ total, current, justify }) => {
  const dots = times(total, i => {
    return <Dot key={i} active={current === i + 1} />;
  });

  return <Container justify={justify}>{dots}</Container>;
};
