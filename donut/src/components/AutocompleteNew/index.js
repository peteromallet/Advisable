import React from "react";
import Fuse from "fuse.js";
import styled from "styled-components";
import Input from "../Input";

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

const StyledAutocompleteOptions = styled.div`
  background: ${(p) => (p.$isSeleted ? "#DDD" : "transparent")};
`;

export default function Autocomplete({ options, value, onChange, ...props }) {
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const [isOpen, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectionIndex, setSelectionIndex] = React.useState(-1);

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
    console.log(e.relatedTarget);
    if (listboxEl && e.relatedTarget && listboxEl.contains(e.relatedTarget)) {
      return;
    }

    setOpen(false);
    setSearchValue("");
    setSelectionIndex(-1);
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

  function handleOptionHover(index) {
    const option = filteredOptions[index];
    if (option) {
      setSelectionIndex(index);
    }
  }

  const fuse = React.useMemo(() => {
    return new Fuse(options, fuseOptions);
  }, [options]);

  const filteredOptions = React.useMemo(() => {
    if (searchValue.length > 0) {
      return fuse.search(searchValue).map((obj) => obj.item);
    }

    return options;
  }, [fuse, searchValue, options]);

  const selectedLabel = React.useMemo(() => {
    return options.find((o) => o.value === value)?.label || "";
  }, [options, value]);

  return (
    <div>
      <Input
        {...props}
        ref={inputRef}
        value={isOpen ? searchValue : selectedLabel}
        onBlur={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      {isOpen && (
        <div role="listbox" ref={listboxRef} tabIndex="-1">
          {filteredOptions.map((option, index) => (
            <AutocompleteOption
              key={option.value}
              selected={selectionIndex === index}
              onClick={() => handleOptionClick(index)}
              onMouseOver={() => handleOptionHover(index)}
            >
              {option.label}
            </AutocompleteOption>
          ))}
        </div>
      )}
    </div>
  );
}

function AutocompleteOption({ children, selected, ...props }) {
  return (
    <StyledAutocompleteOptions
      role="option"
      aria-selected={selected}
      $isSeleted={selected}
      {...props}
    >
      {children}
    </StyledAutocompleteOptions>
  );
}
