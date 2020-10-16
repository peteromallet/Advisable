import PropTypes from "prop-types";
import { Input } from "@advisable/donut";

// Only digits regex pattern
const NUMBER_REGEX = /^[0-9]+$/;
// 31-bits integer for cents values. Server-side limitation.
const MAX_NUMBER = Math.floor(Math.pow(2, 31) / 100);

function CurrencyInput(props) {
  const handleChange = (e) => {
    const value = e.target.value;

    if ((value && !NUMBER_REGEX.test(value)) || Number(value) > MAX_NUMBER) {
      e.preventDefault();
      return;
    }

    props.onChange(e);
  };

  return <Input {...props} onChange={handleChange} />;
}

CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CurrencyInput;
