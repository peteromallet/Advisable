import React from "react";
import { StyledTagSelect, StyledTagSelectTag } from "./styles";

const TagSelect = ({ tags, onChange, selected, ...props }) => {
  const isSelected = tag => selected.indexOf(tag) > -1;

  const handleSelect = tag => () => {
    if (isSelected(tag)) {
      onChange(selected.filter(t => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <StyledTagSelect {...props}>
      {tags.map(tag => (
        <StyledTagSelectTag
          key={tag}
          selected={isSelected(tag)}
          onClick={handleSelect(tag)}
        >
          {isSelected(tag) ? (
            <svg width={12} height={12} fill="none">
              <path d="M1 5.8L4.5 9 13 1" stroke="currentColor" />
            </svg>
          ) : (
            <svg width={12} height={12} fill="none">
              <path d="M5.5 0h1v12h-1V0z" fill="currentColor" />
              <path d="M0 6.5v-1h12v1H0z" fill="currentColor" />
            </svg>
          )}
          {tag}
        </StyledTagSelectTag>
      ))}
    </StyledTagSelect>
  );
};

export default TagSelect;
