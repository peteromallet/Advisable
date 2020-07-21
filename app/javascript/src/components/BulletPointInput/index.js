import React from "react";
import { Textarea } from "@advisable/donut";
import { StyledBulletPointInput, StyledBulletPointInputItem } from "./styles";

export default function BulletPointInput({
  value,
  placeholder,
  onChange,
  autoFocus,
  ...rest
}) {
  const list = [...value, ""];

  const handleKeyDown = (i) => (e) => {
    const inputValue = e.target.value;

    if (e.keyCode === 13) {
      e.preventDefault();
      const next = e.target.parentNode?.nextSibling;
      next?.querySelector("textarea").focus();
    }

    // backspace
    if (e.keyCode === 8 && inputValue.length === 0) {
      onChange(value.filter((item, index) => index !== i));
    }
  };

  const handleChange = (i) => (e) => {
    const inputValue = e.target.value;
    let nextValue = value;

    if (inputValue.length >= 0) {
      nextValue[i] = inputValue;
    }

    onChange(nextValue);
  };

  return (
    <StyledBulletPointInput {...rest}>
      {list.map((item, i) => (
        <StyledBulletPointInputItem key={`bullet-post-input-${i}`}>
          <Textarea
            minRows={1}
            value={item}
            padding={8}
            name={rest.name}
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={handleChange(i)}
            onKeyDown={handleKeyDown(i)}
          />
        </StyledBulletPointInputItem>
      ))}
    </StyledBulletPointInput>
  );
}
