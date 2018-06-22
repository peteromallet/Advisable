import React from "react";
import styled from 'styled-components';
import arrow from './arrow.svg';

const Back = styled.div`
  color: #0064FF;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  padding-left: 12px;
  text-transform: uppercase;

  &:hover { color: #0041A5; }
`

const Arrow = styled.div`
  left: 0;
  top: 50%;
  width: 5px;
  height: 10px;
  position: absolute;
  background-size: cover;
  transform: translateY(-50%);
  background-image: url(${arrow});
`

export default ({ children }) => (
  <Back>
    <Arrow />
    {children || "Back"}
  </Back>
)
