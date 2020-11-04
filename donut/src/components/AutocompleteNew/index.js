import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Tag } from "@advisable/donut";
import Fuse from "fuse.js";
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

const fuseOptions = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["label"],
};

const ENTER = 13;
const ESCAPE = 27;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

function scrollToItem(listbox, item) {
  if (listbox.scrollHeight > listbox.clientHeight) {
    const scrollBottom = listbox.clientHeight + listbox.scrollTop;
    const elementBottom = item.offsetTop + item.offsetHeight;
    if (elementBottom > scrollBottom) {
      listbox.scrollTop = elementBottom - listbox.clientHeight + 4;
    } else if (item.offsetTop < listbox.scrollTop) {
      listbox.scrollTop = item.offsetTop - 4;
    }
  }
}

export default function Autocomplete({
  options: defaultOptions,
  max,
  value,
  multiple,
  onChange,
  creatable,
  loadOptions,
  ...props
}) {
  const typingTimer = React.useRef();
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const shouldScroll = React.useRef(true);
  const selectedItemRef = React.useRef(null);
  const listboxContainerRef = React.useRef(null);
  const [isOpen, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState(defaultOptions);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectionIndex, setSelectionIndex] = React.useState(-1);

  useEffect(() => {
    if (inputRef.current && listboxContainerRef.current) {
      const popper = createPopper(
        inputRef.current,
        listboxContainerRef.current,
        { placement: "bottom" },
      );

      return () => popper.destroy();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      listboxRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldScroll.current && selectedItemRef.current) {
      scrollToItem(listboxRef.current, selectedItemRef.current);
    }
  }, [selectionIndex]);

  // When searchValue changes trigger the loadOptions function if its defined
  useEffect(() => {
    if (!loadOptions) return;

    async function handleLoadOptions() {
      const newOptions = await loadOptions(searchValue);
      setOptions(newOptions);
      setLoading(false);
    }

    clearTimeout(typingTimer.current);

    if (searchValue) {
      setLoading(true);

      typingTimer.current = setTimeout(() => {
        handleLoadOptions();
      }, 300);
    } else {
      setLoading(false);
      setOptions(defaultOptions);
    }
  }, [searchValue, loadOptions, defaultOptions]);

  const searchDirectMatch = React.useMemo(() => {
    const directOption = options.find(
      (o) => o.label.toLowerCase() === searchValue.toLowerCase(),
    );

    if (directOption) return true;
    if (!multiple) return false;
    return value.find(
      (v) => v.label.toLowerCase() === searchValue.toLowerCase(),
    );
  }, [searchValue, options, multiple, value]);

  const filteredOptions = React.useMemo(() => {
    let optionsArray = options;

    if (multiple) {
      const values = value.map((v) => v.value);
      optionsArray = optionsArray.filter((o) => !values.includes(o.value));
    }

    if (!loadOptions && searchValue.length > 0) {
      const fuse = new Fuse(optionsArray, fuseOptions);
      optionsArray = fuse.search(searchValue).map((obj) => obj.item);
    }

    if (searchValue && creatable && !searchDirectMatch) {
      optionsArray = [
        ...optionsArray,
        {
          label: `Create "${searchValue}"`,
          value: searchValue,
        },
      ];
    }

    return optionsArray;
  }, [
    searchValue,
    loadOptions,
    options,
    creatable,
    multiple,
    value,
    searchDirectMatch,
  ]);

  const reachedMax = max ? value.length === max : false;

  function handleChange(option) {
    if (multiple) {
      onChange([...value, option]);
    } else {
      onChange(option);
    }
  }

  function selectOption(index) {
    const selectedOption = filteredOptions[index];
    if (!selectedOption) return;

    setOpen(false);
    setSearchValue("");
    setSelectionIndex(-1);

    if (
      searchValue &&
      creatable &&
      !searchDirectMatch &&
      index === filteredOptions.length - 1
    ) {
      handleChange({
        label: searchValue,
        value: searchValue,
      });
    } else {
      handleChange(selectedOption);
    }
  }

  function removeOption(optionValue) {
    onChange(value.filter((v) => v.value !== optionValue));
  }

  function handleOpen() {
    if (!props.disabled && !isOpen) {
      setOpen(true);
    }
  }

  function handleFocus(e) {
    if (!isOpen) setOpen(true);
    if (props.onFocus) props.onFocus(e);
  }

  function handleBlur(e) {
    const listboxEl = listboxRef.current;
    const clickContained = listboxEl?.contains(e.relatedTarget);
    if (clickContained) return;

    setOpen(false);
    setSearchValue("");
    setSelectionIndex(-1);
    setOptions(defaultOptions);
    if (props.onBlur) props.onBlur(e);
  }

  function handleInputChange(e) {
    handleOpen();
    setSelectionIndex(-1);
    setSearchValue(e.target.value);
  }

  function handleClick() {
    handleOpen();
  }

  function handleKeyDown(e) {
    shouldScroll.current = true;

    if (e.keyCode === ARROW_DOWN) {
      e.preventDefault();
      handleOpen();
      setSelectionIndex((prev) => {
        let next = prev + 1;
        if (next > filteredOptions.length - 1) {
          next = 0;
        }
        return next;
      });
    }

    if (e.keyCode === ARROW_UP) {
      e.preventDefault();
      setSelectionIndex((prev) => {
        let next = prev - 1;
        if (next < -1) {
          next = filteredOptions.length - 1;
        }
        return next;
      });
    }

    if (e.keyCode === ENTER) {
      e.preventDefault();
      selectOption(selectionIndex);
    }

    if (e.keyCode === ESCAPE) {
      setOpen(false);
      setSelectionIndex(-1);
      setSearchValue("");
    }
  }

  function handleOptionClick(index) {
    selectOption(index);
  }

  function handleOptionMouseMove(index) {
    if (index === selectionIndex) return;

    shouldScroll.current = false;

    if (filteredOptions[index]) {
      setSelectionIndex(index);
    }
  }

  return (
    <StyledAutocomplete>
      <div ref={inputRef}>
        <Input
          {...props}
          autoComplete="off"
          value={isOpen ? searchValue : value?.label || ""}
          onBlur={handleBlur}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          suffix={<ChevronDown />}
        />
      </div>
      <Box
        width="100%"
        position="absolute"
        ref={listboxContainerRef}
        style={{
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        <StyledAutocompleteMenu
          as={motion.div}
          $isOpen={isOpen}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 8,
            transition: {
              duration: 0.3,
            },
          }}
        >
          <StyledAutocompleteMenuList
            ref={listboxRef}
            role="listbox"
            tabIndex="-1"
          >
            {loading ? (
              <StyledAutocompleteLoading>loading...</StyledAutocompleteLoading>
            ) : null}

            {!loading && !creatable && filteredOptions.length === 0 ? (
              <StyledAutocompleteNoResults>
                No results
              </StyledAutocompleteNoResults>
            ) : null}

            {reachedMax ? (
              <StyledAutocompleteNoResults>
                You can&apos;t select more than {max} options.
              </StyledAutocompleteNoResults>
            ) : null}

            {!loading && !reachedMax
              ? filteredOptions.map((option, index) => (
                  <AutocompleteOption
                    key={option.value}
                    selected={selectionIndex === index}
                    onClick={() => handleOptionClick(index)}
                    ref={selectionIndex === index ? selectedItemRef : null}
                    onMouseMove={() => handleOptionMouseMove(index)}
                  >
                    {option.label}
                  </AutocompleteOption>
                ))
              : null}
          </StyledAutocompleteMenuList>
        </StyledAutocompleteMenu>
      </Box>

      {multiple && value.length > 0 && (
        <Box paddingTop="sm">
          {value.map((v) => (
            <Tag
              key={v.value}
              size="m"
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
