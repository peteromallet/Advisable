import React, { useCallback, useRef, useState } from "react";
import { Tag } from "@advisable/donut";
import { StyledTagsInput, StyledTagsInputControl } from "./styles";

export default function TagsInput({
  value = [],
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
}) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClick = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      // On return add the tag
      if (e.keyCode === 13 && e.target.value.trim().length > 0) {
        e.preventDefault();
        onChange([...value, e.target.value]);
        setInputValue("");
      }

      // On return add the tag
      if (e.keyCode === 8 && e.target.value.length === 0) {
        e.preventDefault();
        onChange(value.slice(0, -1));
      }
    },
    [value, onChange],
  );

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);

    if (e.target.value) {
      onChange([...value, e.target.value]);
      setInputValue("");
    }

    onBlur(e);
  };

  return (
    <StyledTagsInput data-focused={focused} onClick={handleClick}>
      {value.map((tag, i) => (
        <Tag key={i} size="s">
          {tag}
        </Tag>
      ))}
      <StyledTagsInputControl
        ref={inputRef}
        value={inputValue}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        size={inputValue.length || 1}
      />
    </StyledTagsInput>
  );
}
