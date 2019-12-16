import React from "react";
import { uniqueId, filter, find } from "lodash";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import useBreakpoint from "../../hooks/useBreakpoint";

const Autocomplete = ({ options: selectOptions, value, ...rest }) => {
  // Wether or not we are on mobile
  const isMobile = useBreakpoint("s");

  // We need to store the options in state and create a unique key for each item
  // because some times the API reqturns duplicate records and so we can't use
  // the value attribute as the key.
  const [options, _] = React.useState(
    selectOptions.map(option => ({
      ...option,
      key: uniqueId("autocompleteOption"),
    }))
  );

  let filteredValue = value;

  if (rest.multiple) {
    filteredValue = filter(value, v => {
      return find(options, { value: v });
    });
  } else {
    filteredValue = find(options, { value });
  }

  let isMax = rest.multiple && rest.max && filteredValue.length >= rest.max;

  // If on mobile then load the mobile experience
  if (isMobile) {
    return (
      <Mobile
        options={options}
        initalSelectedItem={filteredValue}
        isMax={isMax}
        value={filteredValue}
        {...rest}
      />
    );
  }

  // fallback to the desktop experience
  return (
    <Desktop
      options={options}
      initalSelectedItem={filteredValue}
      isMax={isMax}
      value={filteredValue}
      {...rest}
    />
  );
};

Autocomplete.defaultProps = {
  formatLabel: item => item.label,
};

export default Autocomplete;
