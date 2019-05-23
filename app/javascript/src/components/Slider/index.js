import React from "react";
import { uniqueId } from "lodash";
import InputLabel from "../InputLabel";
import { Slider as SliderStyles, Input } from "./styles";

const Slider = ({
  label,
  labelHidden,
  value,
  onChange,
  min = 0,
  max = 100,
  ...rest
}) => {
  const range = max - min;
  const progress = ((value - min) / range) * 100.0;
  const [id, _] = React.useState(rest.id || uniqueId("Slider"));

  const cssVars = {
    ["--Slider-progress"]: `${progress}%`,
  };

  return (
    <SliderStyles style={cssVars}>
      {label && (
        <InputLabel hidden={labelHidden} htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <Input
        {...rest}
        id={id}
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
