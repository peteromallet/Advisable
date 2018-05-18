import styled from "styled-components";
import arrows from './arrows.svg';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`

export const Select = styled.select`
  width: 100%;
  height: 40px;
  outline: none;
  color: #103461;
  padding: 0 15px;
  cursor: pointer;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  appearance: none;
  background: white;
  border-radius: 8px;
  box-sizing: border-box;
  letter-spacing: -0.02em;
  border: 2px solid #C8D3E1;

  &:hover {
    border-color: #AABCD4;
  }
`;

export const Arrows = styled.div`
  top: 50%;
  width: 8px;
  right: 15px;
  height: 12px;
  position: absolute;
  transform: translateY(-50%);
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${arrows});
`
