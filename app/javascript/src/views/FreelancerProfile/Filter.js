import React from "react";
import { Box, Text, Checkbox } from "@advisable/donut";
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/menu";
import Scrollable from "../../components/Scrollable";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  width: 280px;
  outline: none;
  background: white;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
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

  const isSelected = option => {
    if (multiple) {
      return selected.indexOf(option) > -1;
    } else {
      return selected === option;
    }
  };

  return (
    <>
      <MenuButton {...menu}>{label}</MenuButton>
      <StyledMenu {...menu} aria-label="Skills">
        <Box height={200}>
          <Scrollable>
            <Box padding="m">
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
          </Scrollable>
        </Box>
        <>
          <Box height={1} bg="neutral100" />
          <Box py="s" px="m">
            <Text
              color="blue600"
              onClick={() => onChange(multiple ? [] : null)}
            >
              Clear
            </Text>
          </Box>
        </>
      </StyledMenu>
    </>
  );
}

export default Filter;
