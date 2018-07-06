import styled from "styled-components";
import arrows from './arrows.svg';

export const Wrapper = styled.div`
  width: ${props => props.block ? "100%" : "auto"};
  max-width: 100%;
`

export const SelectWrapper = styled.div`
  width: ${props => props.block ? "100%" : "auto"};
  position: relative;
  display: inline-block;
`

export const Select = styled.select`
  width: 100%;
  height: 36px;
  border: none;
  outline: none;
  color: #103461;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  appearance: none;
  background: #F4F7FC;
  border-radius: 8px;
  padding: 0 35px 0 12px;
  box-sizing: border-box;
  letter-spacing: -0.03em;

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
