import Fuse from "fuse.js";
import uniqueId from "lodash/uniqueId";
import { useReducer, useEffect, useRef, useMemo } from "react";

const ENTER = 13;
const ESCAPE = 27;
const ARROW_UP = 38;
const ARROW_DOWN = 40;
const TYPING_TIMER = 700;
const OPEN = "OPEN";
const RESET = "RESET";
const SET_LOADING = "SET_LOADING";
const UPDATE_SEARCH = "UPDATE_SEARCH";
const UPDATE_OPTIONS = "UPDATE_OPTIONS";
const UPDATE_SELECTION_INDEX = "UPDATE_SELECTION_INDEX";

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["label"],
};

function initialState(options) {
  return {
    options: options || [],
    isOpen: false,
    isLoading: false,
    searchValue: "",
    selectionIndex: 0,
  };
}

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

function reducer(state, action) {
  switch (action.type) {
    case UPDATE_OPTIONS: {
      return {
        ...state,
        isLoading: false,
        selectionIndex: 0,
        options: action.options || [],
      };
    }
    case UPDATE_SEARCH: {
      return {
        ...state,
        selectionIndex: 0,
        searchValue: action.searchValue,
      };
    }
    case UPDATE_SELECTION_INDEX: {
      return { ...state, selectionIndex: action.selectionIndex };
    }
    case SET_LOADING: {
      return { ...state, isLoading: true };
    }
    case OPEN: {
      return { ...state, isOpen: true };
    }
    case RESET: {
      return { ...state, isOpen: false, searchValue: "", selectionIndex: 0 };
    }
  }
}

export default function useCombobox({
  options,
  loadOptions,
  multiple,
  value,
  creatable,
  max,
  onChange,
  ...props
}) {
  const inputRef = useRef(null);
  const listboxRef = useRef(null);
  const typingTimer = useRef(null);
  const shouldScroll = useRef(true);
  const selectedItemRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState(options));
  const listboxID = useMemo(() => uniqueId("listbox"), []);

  useEffect(() => {
    if (!state.isOpen && listboxRef.current) {
      listboxRef.current.scrollTop = 0;
    }
  }, [state.isOpen]);

  // Every time the selection index changes we scroll the list to that item
  // unless shouldScroll is false.
  useEffect(() => {
    if (shouldScroll.current && selectedItemRef.current) {
      scrollToItem(listboxRef.current, selectedItemRef.current);
    }
  }, [state.selectionIndex]);

  // When searchValue changes trigger the loadOptions function if its defined
  useEffect(() => {
    if (!loadOptions) return;

    async function handleLoadOptions() {
      const newOptions = await loadOptions(state.searchValue);
      dispatch({ type: UPDATE_OPTIONS, options: newOptions });
    }

    clearTimeout(typingTimer.current);

    if (state.searchValue) {
      dispatch({ type: SET_LOADING });

      typingTimer.current = setTimeout(() => {
        handleLoadOptions();
      }, TYPING_TIMER);
    } else {
      dispatch({ type: UPDATE_OPTIONS, options });
    }
  }, [state.searchValue, options, loadOptions]);

  const searchDirectMatch = useMemo(() => {
    const directOption = state.options.find(
      (o) => o.label.toLowerCase() === state.searchValue.toLowerCase(),
    );

    if (directOption) return true;
    if (!multiple) return false;
    return value.find(
      (v) => v.label.toLowerCase() === state.searchValue.toLowerCase(),
    );
  }, [state.searchValue, state.options, multiple, value]);

  const filteredOptions = useMemo(() => {
    let optionsArray = state.options;

    if (!loadOptions && state.searchValue.length > 0) {
      const fuse = new Fuse(optionsArray, FUSE_OPTIONS);
      optionsArray = fuse.search(state.searchValue).map((obj) => obj.item);
    }

    if (state.searchValue && creatable && !searchDirectMatch) {
      optionsArray = [
        ...optionsArray,
        {
          label: `Create "${state.searchValue}"`,
          value: state.searchValue,
        },
      ];
    }

    return optionsArray;
  }, [
    state.searchValue,
    state.options,
    loadOptions,
    creatable,
    searchDirectMatch,
  ]);

  const hasOptions = useMemo(() => options?.length > 0, [options]);

  const reachedMax = max ? value.length === max : false;

  function isValue(index) {
    const option = filteredOptions[index];

    if (multiple) {
      return value?.some((v) => v.value === option.value);
    }

    return value?.value === option.value;
  }

  function handleChange(option) {
    if (multiple) {
      onChange([...value, option]);
    } else {
      onChange(option);
    }
  }

  function removeOption(optionValue) {
    onChange(value.filter((v) => v.value !== optionValue));
  }

  function selectOption(index) {
    const selectedOption = filteredOptions[index];
    if (!selectedOption) return;

    dispatch({ type: RESET });

    if (multiple && isValue(index)) {
      removeOption(selectedOption.value);
      return;
    }

    if (
      state.searchValue &&
      creatable &&
      !searchDirectMatch &&
      index === filteredOptions.length - 1
    ) {
      handleChange({
        label: state.searchValue,
        value: state.searchValue,
      });
    } else {
      handleChange(selectedOption);
    }
  }

  function handleOpen() {
    if (!props.disabled && !state.isOpen) {
      dispatch({ type: OPEN });
    }
  }

  function handleClose() {
    dispatch({ type: RESET });
  }

  function handleFocus(e) {
    if (!state.isOpen && hasOptions) {
      handleOpen();
    }
    if (props.onFocus) props.onFocus(e);
  }

  function handleBlur(e) {
    const listboxEl = listboxRef.current;
    const clickContained = listboxEl?.contains(e.relatedTarget);
    if (clickContained) return;

    dispatch({ type: RESET });
    if (props.onBlur) props.onBlur(e);
  }

  function handleInputChange(e) {
    handleOpen();
    dispatch({ type: UPDATE_SEARCH, searchValue: e.target.value });
    if (listboxRef.current) {
      listboxRef.current.scrollTop = 0;
    }
  }

  function handleClick() {
    if (hasOptions) {
      handleOpen();
    }
  }

  function handleKeyDown(e) {
    handleOpen();

    shouldScroll.current = true;

    if (e.keyCode === ARROW_DOWN) {
      e.preventDefault();
      handleOpen();
      let nextSelectionIndex = state.selectionIndex + 1;
      if (nextSelectionIndex > filteredOptions.length - 1) {
        nextSelectionIndex = 0;
      }
      dispatch({
        type: UPDATE_SELECTION_INDEX,
        selectionIndex: nextSelectionIndex,
      });
    }

    if (e.keyCode === ARROW_UP) {
      e.preventDefault();
      let nextSelectionIndex = state.selectionIndex - 1;
      if (nextSelectionIndex < 0) {
        nextSelectionIndex = filteredOptions.length - 1;
      }
      dispatch({
        type: UPDATE_SELECTION_INDEX,
        selectionIndex: nextSelectionIndex,
      });
    }

    if (e.keyCode === ENTER && state.isOpen) {
      e.preventDefault();
      selectOption(state.selectionIndex);
    }

    if (e.keyCode === ESCAPE) {
      dispatch({ type: RESET });
    }
  }

  function handleOptionClick(index) {
    selectOption(index);
  }

  function handleOptionMouseMove(index) {
    if (index === state.selectionIndex) return;

    shouldScroll.current = false;

    if (filteredOptions[index]) {
      dispatch({ type: UPDATE_SELECTION_INDEX, selectionIndex: index });
    }
  }

  const containerProps = {
    role: "combobox",
    "aria-owns": state.isOpen ? listboxID : null,
    "aria-expanded": state.isOpen ? "true" : "false",
    "aria-haspopup": "listbox",
  };

  const inputProps = (opts = { blur: true }) => ({
    ...props,
    ref: inputRef,
    role: "combobox",
    autoComplete: "off",
    onBlur: opts.blur ? handleBlur : undefined,
    onClick: handleClick,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onChange: handleInputChange,
    "aria-autocomplete": "list",
    "aria-activedescendant": state.selectionIndex
      ? `option_${state.selectionIndex}`
      : null,
    "aria-controls": state.isOpen ? listboxID : null,
    value: state.isOpen ? state.searchValue : value?.label || "",
  });

  const propsForOption = (index) => {
    return {
      role: "option",
      id: `option_${index}`,
      isValue: isValue(index),
      selected: state.selectionIndex === index,
      onClick: () => handleOptionClick(index),
      onMouseMove: () => handleOptionMouseMove(index),
      ref: state.selectionIndex === index ? selectedItemRef : null,
    };
  };

  const menuProps = {
    max,
    id: listboxID,
    ref: listboxRef,
    role: "listbox",
    tabIndex: -1,
    propsForOption,
    hasReachedMax: reachedMax,
    isLoading: state.isLoading,
    isCreateable: props.isCreateable,
    options: filteredOptions,
  };

  return {
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    hasReachedMax: reachedMax,
    options: filteredOptions,
    inputProps,
    menuProps,
    propsForOption,
    containerProps,
    removeOption,
    close: handleClose,
  };
}
