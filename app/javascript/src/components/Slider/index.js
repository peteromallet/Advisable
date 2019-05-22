import React from "react";
import { Slider as SliderStyles, Input } from "./styles";

const Slider = ({ value, onChange, min = 0, max = 100, ...rest }) => {
  const range = max - min;
  const progress = ((value - min) / range) * 100.0;

  const cssVars = {
    ["--Slider-progress"]: `${progress}%`,
  };

  return (
    <SliderStyles style={cssVars}>
      <Input
        {...rest}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </SliderStyles>
  );
};

export default Slider;
