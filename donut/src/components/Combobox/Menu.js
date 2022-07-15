import React from "react";
import { Box } from "@advisable/donut";
import { Check } from "@styled-icons/heroicons-outline/Check";
import {
  StyledAutocompleteLoading,
  StyledAutocompleteMenuList,
  StyledAutocompleteMenuItem,
  StyledAutocompleteNoResults,
} from "./styles";

function Option({ option }) {
  return <Box>{option.label}</Box>;
}

const AutocompleteOption = React.forwardRef(function AutocompleteOption(
  { selected, isValue, option, component = Option, ...props },
  ref,
) {
  return (
    <StyledAutocompleteMenuItem
      ref={ref}
      role="option"
      data-testid="comboxBoxOption"
      aria-selected={selected}
      $isValue={isValue}
      {...props}
    >
      {isValue ? (
        <Box color="blue400" mr={1}>
          <Check size={16} />
        </Box>
      ) : null}
      {React.createElement(component, { option })}
    </StyledAutocompleteMenuItem>
  );
});

const ComboboxMenu = React.forwardRef(function ComboboxMenu(
  { options, isLoading, isCreatable, hasReachedMax, propsForOption, ...props },
  ref,
) {
  return (
    <StyledAutocompleteMenuList ref={ref} {...props}>
      {isLoading ? (
        <StyledAutocompleteLoading>loading...</StyledAutocompleteLoading>
      ) : null}

      {!isLoading && !isCreatable && !hasReachedMax && options.length === 0 ? (
        <StyledAutocompleteNoResults>No results</StyledAutocompleteNoResults>
      ) : null}

      {hasReachedMax ? (
        <StyledAutocompleteNoResults>
          You can&apos;t select more than {props.max} options.
        </StyledAutocompleteNoResults>
      ) : null}

      {!isLoading && !hasReachedMax
        ? options.map((option, index) => (
            <AutocompleteOption
              key={`${option.value}-${index}`}
              option={option}
              {...propsForOption(index)}
            />
          ))
        : null}
    </StyledAutocompleteMenuList>
  );
});

export default ComboboxMenu;
