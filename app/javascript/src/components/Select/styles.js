import styled from "styled-components";
import arrows from "./arrows.svg";
import { withSpacing } from "src/components/Spacing";

export const Wrapper = withSpacing(styled.div`
  width: ${props => (props.block ? "100%" : "auto")};
  max-width: 100%;
`);

export const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

export const Select = styled.select`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  color: #103461;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  appearance: none;
  border-radius: 8px;
  padding: 0 35px 0 12px;
  box-sizing: border-box;
  background: rgba(29, 39, 75, 0.06);

  &:hover {
    border-color: #aabcd4;
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
`;
