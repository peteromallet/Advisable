import React from "react";
import { uniqueId } from "lodash-es";
import { SegmentedControlRadio as SegmentedControlRadioStyles } from "./styles";

const SegmentedControlRadio = ({ label, ...rest }) => {
  const [id, _] = React.useState(uniqueId("SegmentedControl"));
  return (
    <SegmentedControlRadioStyles data-active={rest.checked}>
      <input {...rest} type="radio" id={id} />
      <label htmlFor={id}>{label}</label>
    </SegmentedControlRadioStyles>
  );
};

export default SegmentedControlRadio;
