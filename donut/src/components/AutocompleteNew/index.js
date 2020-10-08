import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Box } from "@advisable/donut";
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
  threshold: 0.6,
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
  value,
  onChange,
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

  function handleClick(e) {
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
      const clickedOption = filteredOptions[selectionIndex];
      if (clickedOption) {
        e.preventDefault();
        setOpen(false);
        setSearchValue("");
        setSelectionIndex(-1);
        onChange(clickedOption.value);
      }
    }

    if (e.keyCode === ESCAPE) {
      setOpen(false);
      setSelectionIndex(-1);
      setSearchValue("");
    }
  }

  function handleOptionClick(index) {
    const clickedOption = filteredOptions[index];
    if (clickedOption) {
      setOpen(false);
      setSearchValue("");
      setSelectionIndex(-1);
      onChange(clickedOption.value);
    }
  }

  function handleOptionMouseMove(index) {
    if (index === selectionIndex) return;

    shouldScroll.current = false;

    if (filteredOptions[index]) {
      setSelectionIndex(index);
    }
  }

  const fuse = React.useMemo(() => {
    return new Fuse(options, fuseOptions);
  }, [options]);

  const filteredOptions = React.useMemo(() => {
    if (!loadOptions && searchValue.length > 0) {
      return fuse.search(searchValue).map((obj) => obj.item);
    }

    return options;
  }, [fuse, searchValue, loadOptions, options]);

  const selectedLabel = React.useMemo(() => {
    return options.find((o) => o.value === value)?.label || "";
  }, [options, value]);

  return (
    <StyledAutocomplete>
      <div ref={inputRef}>
        <Input
          {...props}
          value={isOpen ? searchValue : selectedLabel}
          onBlur={handleBlur}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          suffix={<ChevronDown />}
        />
      </div>
      <Box width="100%" ref={listboxContainerRef}>
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

            {!loading && filteredOptions.length === 0 ? (
              <StyledAutocompleteNoResults>
                No results
              </StyledAutocompleteNoResults>
            ) : null}

            {!loading
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
