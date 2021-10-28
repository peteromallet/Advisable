import React from "react";
import { theme } from "@advisable/donut";
import styled from "styled-components";
import { ChevronDown, Globe } from "@styled-icons/heroicons-solid";
import ZONES from "../TimeZoneSelect/zones";

const StyledTimezoneSelect = styled.div`
  padding: 12px;
  margin: -12px;
  position: relative;
  align-items: center;
  display: inline-flex;
  color: ${theme.colors.neutral700};
  /* border: 1px solid ${theme.colors.neutral200}; */

  svg {
    margin-right: 4px;
  }

  b {
    font-weight: 500;
    margin-left: 8px;
    color: ${theme.colors.neutral900};
  }

  select {
    top: 0;
    left: 0;
    opacity: 0.001;
    width: 100%;
    height: 100%;
    appearance: none;
    position: absolute;
  }
`;

export default function TimezoneSelect(props) {
  return (
    <StyledTimezoneSelect>
      <Globe size={16} />
      Timezone: <b>{props.value}</b> <ChevronDown size={16} />
      <select {...props}>
        {ZONES.map((z) => (
          <option key={z}>{z}</option>
        ))}
      </select>
    </StyledTimezoneSelect>
  );
}
