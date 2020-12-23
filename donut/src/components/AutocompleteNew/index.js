import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Tag } from "@advisable/donut";
import useCombobox from "./useCombobox";
import { createPopper } from "@popperjs/core";
import { ChevronDown } from "@styled-icons/ionicons-outline";
import Input from "../Input";
import {
  StyledAutocomplete,
  StyledAutocompleteMenu,
  StyledAutocompleteLoading,
  StyledAutocompleteMenuList,
  StyledAutocompleteMenuItem,
  StyledAutocompleteNoResults,
} from "./styles";

export default function Autocomplete({ ...props }) {
  const {
    isOpen,
    isLoading,
    hasReachedMax,
    options,
    containerProps,
    inputProps,
    listboxProps,
    removeOption,
    propsForOption,
  } = useCombobox(props);
  const inputConatinerRef = React.useRef(null);
  const listboxContainerRef = React.useRef(null);

  useEffect(() => {
    if (inputConatinerRef.current && listboxContainerRef.current) {
      const popper = createPopper(
        inputConatinerRef.current,
        listboxContainerRef.current,
        {
          placement: "bottom",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ],
        },
      );

      return () => popper.destroy();
    }
  }, [isOpen]);

  return (
    <StyledAutocomplete {...containerProps}>
      <div ref={inputConatinerRef}>
        <Input {...inputProps} suffix={<ChevronDown />} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <Box width="100%" position="absolute" ref={listboxContainerRef}>
            <StyledAutocompleteMenu
              as={motion.div}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <StyledAutocompleteMenuList {...listboxProps}>
                {isLoading ? (
                  <StyledAutocompleteLoading>
                    loading...
                  </StyledAutocompleteLoading>
                ) : null}

                {!isLoading &&
                !props.creatable &&
                !hasReachedMax &&
                options.length === 0 ? (
                  <StyledAutocompleteNoResults>
                    No results
                  </StyledAutocompleteNoResults>
                ) : null}

                {hasReachedMax ? (
                  <StyledAutocompleteNoResults>
                    You can&apos;t select more than {props.max} options.
                  </StyledAutocompleteNoResults>
                ) : null}

                {!isLoading && !hasReachedMax
                  ? options.map((option, index) => (
                      <AutocompleteOption
                        key={option.value}
                        {...propsForOption(index)}
                      >
                        {option.label}
                      </AutocompleteOption>
                    ))
                  : null}
              </StyledAutocompleteMenuList>
            </StyledAutocompleteMenu>
          </Box>
        )}
      </AnimatePresence>

      {props.multiple && props.value.length > 0 && (
        <Box paddingTop={2}>
          {props.value.map((v) => (
            <Tag
              size="s"
              key={v.value}
              marginRight="2xs"
              marginBottom="2xs"
              onRemove={() => removeOption(v.value)}
            >
              {v.label}
            </Tag>
          ))}
        </Box>
      )}
    </StyledAutocomplete>
  );
}

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
