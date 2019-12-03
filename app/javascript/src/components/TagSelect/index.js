import React from "react";
import { StyledTagSelect, StyledTagSelectTag } from "./styles";

const TagSelect = ({ tags, multiple, onChange, selected, ...props }) => {
  const isSelected = tag => {
    if (multiple) {
      return selected.indexOf(tag) > -1;
    }

    return selected === tag;
  };

  const handleSelect = tag => () => {
    if (multiple) {
      if (isSelected(tag)) {
        onChange(selected.filter(t => t !== tag));
      } else {
        onChange([...selected, tag]);
      }

      return;
    }

    onChange(tag);
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
          ) : multiple ? (
            <svg width={12} height={12} fill="none">
              <path d="M5.5 0h1v12h-1V0z" fill="currentColor" />
              <path d="M0 6.5v-1h12v1H0z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor"></circle>
            </svg>
          )}
          {tag}
        </StyledTagSelectTag>
      ))}
    </StyledTagSelect>
  );
};

TagSelect.defaultProps = {
  multiple: true,
};

export default TagSelect;
