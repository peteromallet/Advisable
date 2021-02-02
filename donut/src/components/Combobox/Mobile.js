import React from "react";
import { Box, Input, Button } from "@advisable/donut";
import { Check } from "@styled-icons/heroicons-outline";
import { ChevronDown } from "@styled-icons/ionicons-outline";
import Tags from "./Tags";
import Menu from "./Menu";
import { StyledAutocomplete, StyledComboxMobileContainer } from "./styles";

export default function ComboboxMobile({
  inputProps,
  containerProps,
  removeOption,
  isOpen,
  menuProps,
  ...props
}) {
  return (
    <StyledAutocomplete {...containerProps}>
      <Input {...inputProps({ blur: false })} suffix={<ChevronDown />} />

      {isOpen && (
        <StyledComboxMobileContainer
          top="0"
          left="0"
          bg="white"
          width="100%"
          display="flex"
          position="fixed"
          flexDirection="column"
        >
          <Box
            padding={2}
            display="flex"
            flexShrink={0}
            flexGrow={0}
            alignItems="center"
          >
            <Input autoFocus {...inputProps()} />
            <Box pl={2}>
              <Button variant="subtle" onClick={props.close}>
                <Check />
              </Button>
            </Box>
          </Box>

          <Box flexGrow={1} flexShrink={1} height={0}>
            <Menu {...menuProps} />
          </Box>
        </StyledComboxMobileContainer>
      )}

      {props.multiple && props.value.length > 0 && (
        <Tags value={props.value} removeOption={removeOption} />
      )}
    </StyledAutocomplete>
  );
}
