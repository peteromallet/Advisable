import React from "react";
import {
  StyledAutocompleteLoading,
  StyledAutocompleteMenuList,
  StyledAutocompleteMenuItem,
  StyledAutocompleteNoResults,
} from "./styles";

const AutocompleteOption = React.forwardRef(function AutocompleteOption(
  { children, selected, ...props },
  ref,
) {
  return (
    <StyledAutocompleteMenuItem
      ref={ref}
      role="option"
      aria-selected={selected}
      {...props}
    >
      <span>{children}</span>
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
            <AutocompleteOption key={option.value} {...propsForOption(index)}>
              {option.label}
            </AutocompleteOption>
          ))
        : null}
    </StyledAutocompleteMenuList>
  );
});

export default ComboboxMenu;
