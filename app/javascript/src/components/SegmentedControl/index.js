import React from "react";
import SegmentedControlRadio from "./SegmentedControlRadio";
import { SegmentedControl as SegmentedControlStyles } from "./styles";

const SegmentedControl = ({ options, value, ...rest }) => {
  return (
    <SegmentedControlStyles>
      {options.map(option => (
        <SegmentedControlRadio
          key={option.value}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          {...rest}
        />
      ))}
    </SegmentedControlStyles>
  );
};

export default SegmentedControl;
