import React from "react";
import Div100vh from "react-div-100vh";
import { rgba, darken } from "polished";
import {
  Box,
  Checkbox,
  theme,
  useBreakpoint,
} from "@advisable/donut";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  width: 100%;
  outline: none;
  overflow: hidden;
  background: white;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  z-index: 900;
  display: flex;
  flex-direction: column;

  @media (max-width: 52em) {
    position: fixed !important;
    transform: none !important;
  }

  @media (min-width: 52em) {
    width: 280px;
    border-radius: 8px;
  }
`;

const StyledMenuToggleLabel = styled.div`
  font-size: inherit;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${theme.colors.neutral500};
`;

const StyledMenuToggleValue = styled.div`
  font-size: inherit;
  margin-left: 8px;
  overflow: hidden;
  text-align: left;
  padding: 5px 12px;
  border-radius: 8px;
  white-space: nowrap;
  padding-right: 24px;
  text-overflow: ellipsis;
  color: ${theme.colors.neutral900};
  background: ${theme.colors.neutral100};
  width: 70%;

  @media (min-width: 52em) {
    max-width: 150px;
  }
`;

const StyledMenuToggle = styled(MenuButton)`
  padding: 0;
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  user-select: none;
  border-radius: 8px;
  align-items: center;
  display: inline-flex;
  background: transparent;
  justify-content: space-between;

  @media (min-width: 52em) {
    width: auto;
    justify-content: auto;
  }

  &:hover ${StyledMenuToggleValue} {
    background: ${darken(0.05, theme.colors.neutral100)};
  }
`;

const FilterButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  appearance: none;
  font-weight: 500;
  border-radius: 8px;
  box-shadow: 0 1px 2px ${rgba(theme.colors.neutral900, 0.1)};
  font-size: 15px;
  padding: 12px 20px;
  width: 100%;

  @media (min-width: 52em) {
    width: auto;
    font-size: 13px;
    padding: 5px 12px;
  }
`;

const ClearButton = styled(FilterButton)`
  background: white;
  color: ${theme.colors.neutral700};
  border: 1px solid ${theme.colors.neutral200};

  &:hover {
    color: ${theme.colors.neutral900};
    box-shadow: 0 1px 4px ${rgba(theme.colors.neutral900, 0.2)};
  }

  &:active {
    color: ${theme.colors.neutral500};
    box-shadow: 0 1px 1px ${rgba(theme.colors.neutral900, 0.1)};
  }
`;

const DoneButton = styled(FilterButton)`
  color: white;
  margin-right: 4px;
  background: ${theme.colors.blue500};

  &:hover {
    background: ${theme.colors.blue600};
    box-shadow: 0 1px 4px ${rgba(theme.colors.neutral900, 0.3)};
  }

  &:active {
    background: ${theme.colors.blue800};
    box-shadow: 0 1px 1px ${rgba(theme.colors.neutral900, 0.1)};
  }
`;

function Filter({ label, options, selected, onChange }) {
  const isDesktop = useBreakpoint("mUp");

  const menu = useMenuState({
    placement: "top-end",
  });

  const handleChange = e => {
    const option = e.target.value;
    if (selected.indexOf(option) > -1) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleClear = () => {
    onChange([]);
    menu.hide();
  };

  const isSelected = option => {
    return selected.indexOf(option) > -1;
  };

  const value = selected.length > 0 ? selected.join(", ") : "Any";

  return (
    <>
      <StyledMenuToggle {...menu} aria-label={`Filter projects by ${label}`}>
        <StyledMenuToggleLabel>{label}</StyledMenuToggleLabel>
        <StyledMenuToggleValue>{value}</StyledMenuToggleValue>
      </StyledMenuToggle>
      <Div100vh
        {...menu}
        as={StyledMenu}
        aria-label={label}
        style={{ height: isDesktop ? "300px" : "100rvh" }}
      >
        <Box
          flexShrink={1}
          flexGrow={1}
          height="100%"
          py="m"
          px="s"
          overflowY="scroll"
          position="relative"
        >
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
        <Box padding={{ _: "m", md: "xs" }} bg="neutral50" boxShadow="sx">
          <DoneButton onClick={menu.hide} aria-label={`Filter by ${label}`}>
            Filter
          </DoneButton>
          <ClearButton onClick={handleClear}>Clear</ClearButton>
        </Box>
      </Div100vh>
    </>
  );
}

export default Filter;
