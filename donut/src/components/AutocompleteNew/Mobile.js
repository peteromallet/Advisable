import React from "react";
import { use100vh } from "react-div-100vh";
import { Box, Input } from "@advisable/donut";
import { ChevronDown } from "@styled-icons/ionicons-outline";
import Tags from "./Tags";
import { StyledAutocomplete } from "./styles";

export default function ComboboxMobile({
  inputProps,
  containerProps,
  removeOption,
  isOpen,
  ...props
}) {
  const height = use100vh();

  return (
    <StyledAutocomplete {...containerProps}>
      <Input {...inputProps} suffix={<ChevronDown />} />

      {isOpen && (
        <Box
          top="0"
          left="0"
          position="fixed"
          bg="white"
          width="100%"
          height={height || "100vh"}
        >
          <Box padding={2}>
            <Input autoFocus />
          </Box>

          <button onClick={props.close}>x</button>
        </Box>
      )}

      {props.multiple && props.value.length > 0 && (
        <Tags value={props.value} removeOption={removeOption} />
      )}
    </StyledAutocomplete>
  );
}
