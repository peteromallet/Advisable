import React from "react";
import { uniqueId, find } from "lodash";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import useBreakpoint from "../../hooks/useBreakpoint";

const Autocomplete = ({ options: selectOptions, ...rest }) => {
  // Wether or not we are on mobile
  const isMobile = useBreakpoint("s");

  // We need to store the options in state and create a unique key for each item
  // because some times the API reqturns duplicate records.
  const [options, _] = React.useState(
    selectOptions.map(option => ({
      ...option,
      key: uniqueId("autocompleteOption"),
    }))
  );

  const initalSelectedItem = find(options, { value: rest.value });

  if (isMobile) {
    return (
      <Mobile
        options={options}
        initalSelectedItem={initalSelectedItem}
        {...rest}
      />
    );
  }

  return (
    <Desktop
      options={options}
      initalSelectedItem={initalSelectedItem}
      {...rest}
    />
  );
};

export default Autocomplete;
