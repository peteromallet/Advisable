import styled, { css } from "styled-components";

export const Slider = styled.div`
  width: "100%";
`;

const track = css`
  width: 100%;
  height: 4px;
  border: none;
  border-radius: 4px;
  background-color: var(--progress-upper);
  background-image: linear-gradient(to right, var(--gradient-colors));
`;

const thumb = css`
  width: 20px;
  height: 20px;
  appearance: none;
  border-radius: 50%;
  background: white;
  cursor: -webkit-grab;
  border: 2px solid #173fcd;
  margin-top: -8px;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  appearance: none;
  background-color: transparent;

  --progress-lower: #173fcd;
  --progress-upper: #e2e6f3;
  --gradient-colors: var(--progress-lower, transparent) 0%,
    var(--progress-lower, transparent) var(--Slider-progress, 0%),
    var(--progress-upper, transparent) var(--Slider-progress, 100%),
    var(--progress-upper, transparent) 100%;

  &::-ms-track {
    ${track}
  }

  &::-moz-range-track {
    ${track}
  }

  &::-webkit-slider-runnable-track {
    ${track}
  }

  &::-ms-thumb {
    ${thumb}
  }

  &::-moz-range-thumb {
    ${thumb}
  }

  &::-webkit-slider-thumb {
    ${thumb}
  }
`;

export default Slider;
