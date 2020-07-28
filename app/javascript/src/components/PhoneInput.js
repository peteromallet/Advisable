import React from "react";
import PropTypes from "prop-types";
import { Input } from "@advisable/donut";

const NUMBER_REGEX = /^[0-9+()-/" /"]+$/;
function PhoneInput(props) {
  const handleChange = (e) => {
    const value = e.target.value;

    if (value && !NUMBER_REGEX.test(value)) {
      e.preventDefault();
      return;
    }

    props.onChange(e);
  };

  return <Input {...props} onChange={handleChange} />;
}

PhoneInput.propTypes = {
  onChange: PropTypes.func,
};

export default PhoneInput;
