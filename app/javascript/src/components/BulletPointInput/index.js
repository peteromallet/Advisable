import React from "react";
import { Textarea } from "@advisable/donut";
import { StyledBulletPointInput, StyledBulletPointInputItem } from "./styles";

export default function BulletPointInput({
  value,
  placeholder,
  onChange,
  ...rest
}) {
  const list = [...value, ""];

  const handleChange = (i) => (e) => {
    const inputValue = e.target.value;
    let nextValue = value;

    if (inputValue.length > 0) {
      nextValue[i] = inputValue;
    } else {
      nextValue = nextValue.filter((item, index) => index !== i);
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
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={handleChange(i)}
          />
        </StyledBulletPointInputItem>
      ))}
    </StyledBulletPointInput>
  );
}
