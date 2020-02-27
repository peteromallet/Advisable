import React from "react";
import { rgba, darken } from "polished";
import { Box, Text, Checkbox, theme } from "@advisable/donut";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/menu";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  width: 280px;
  outline: none;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
`;

const StyledMenuToggleLabel = styled.div`
  font-size: inherit;
  color: ${theme.colors.neutral500};
`;

const StyledMenuToggleValue = styled.div`
  font-size: inherit;
  margin-left: 8px;
  max-width: 150px;
  overflow: hidden;
  padding: 5px 12px;
  border-radius: 8px;
  white-space: nowrap;
  padding-right: 24px;
  text-overflow: ellipsis;
  color: ${theme.colors.neutral900};
  background: ${theme.colors.neutral100};
`;

const StyledMenuToggle = styled(MenuButton)`
  padding: 0;
  border: none;
  outline: none;
  font-size: 14px;
  appearance: none;
  border-radius: 8px;
  align-items: center;
  display: inline-flex;
  background: transparent;

  &:hover ${StyledMenuToggleValue} {
    background: ${darken(0.05, theme.colors.neutral100)};
  }
`;

const FilterButton = styled.button`
  border: none;
  outline: none;
  font-size: 13px;
  appearance: none;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 8px;
  box-shadow: 0 1px 2px ${rgba(theme.colors.neutral900, 0.1)};
`;

const ClearButton = styled(FilterButton)`
  background: white;
  border: 1px solid ${theme.colors.neutral200};
`;

const DoneButton = styled(FilterButton)`
  color: white;
  margin-right: 4px;
  background: ${theme.colors.blue500};

  &:hover {
    background: ${theme.colors.blue600};
  }
`;

function Filter({ label, options, selected, onChange, multiple = false }) {
  const menu = useMenuState({
    placement: "top-end",
  });

  const handleChange = e => {
    const option = e.target.value;
    if (multiple) {
      if (selected.indexOf(option) > -1) {
        onChange(selected.filter(s => s !== option));
      } else {
        onChange([...selected, option]);
      }
    } else {
      onChange(option);
    }
  };

  const handleClear = () => {
    onChange(multiple ? [] : null);
    menu.hide();
  };

  const isSelected = option => {
    if (multiple) {
      return selected.indexOf(option) > -1;
    } else {
      return selected === option;
    }
  };

  let value = "Any";
  if (multiple && selected.length > 0) {
    value = selected.join(", ");
  }

  if (!multiple && selected) {
    value = selected;
  }

  return (
    <>
      <StyledMenuToggle {...menu}>
        <StyledMenuToggleLabel>{label}</StyledMenuToggleLabel>
        <StyledMenuToggleValue>{value}</StyledMenuToggleValue>
      </StyledMenuToggle>
      <StyledMenu {...menu} aria-label="Skills">
        <Box height={200} padding="m" overflowY="scroll">
          {options.map(option => (
            <MenuItem
              {...menu}
              mb="xs"
              key={option}
              as={Checkbox}
              value={option}
              onChange={handleChange}
              checked={isSelected(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Box>
        <Box p="xs" bg="neutral50">
          <DoneButton onClick={menu.hide}>Done</DoneButton>
          <ClearButton onClick={handleClear}>Clear</ClearButton>
        </Box>
      </StyledMenu>
    </>
  );
}

export default Filter;
