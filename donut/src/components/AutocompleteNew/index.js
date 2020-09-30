import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Box } from "@advisable/donut";
import Fuse from "fuse.js";
import { createPopper } from "@popperjs/core";
import Input from "../Input";
import {
  StyledAutocomplete,
  StyledAutocompleteMenu,
  StyledAutocompleteMenuItem,
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

export default function Autocomplete({ options, value, onChange, ...props }) {
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const shouldScroll = React.useRef(true);
  const selectedItemRef = React.useRef(null);
  const listboxContainerRef = React.useRef(null);
  const [isOpen, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectionIndex, setSelectionIndex] = React.useState(-1);

  useEffect(() => {
    if (inputRef.current && listboxContainerRef.current) {
      const popper = createPopper(
        inputRef.current,
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
    shouldScroll.current = false;
    if (index === selectionIndex) return;

    if (filteredOptions[index]) {
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
        />
      </div>
      <Box width="100%" ref={listboxContainerRef}>
        <StyledAutocompleteMenu
          as={motion.ul}
          role="listbox"
          tabIndex="-1"
          ref={listboxRef}
          $isOpen={isOpen}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 12,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {filteredOptions.map((option, index) => (
            <AutocompleteOption
              key={option.value}
              selected={selectionIndex === index}
              onClick={() => handleOptionClick(index)}
              ref={selectionIndex === index ? selectedItemRef : null}
              onMouseMove={() => handleOptionMouseMove(index)}
            >
              {option.label}
            </AutocompleteOption>
          ))}
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
      $isSelected={selected}
      {...props}
    >
      <span>{children}</span>
    </StyledAutocompleteMenuItem>
  );
});
