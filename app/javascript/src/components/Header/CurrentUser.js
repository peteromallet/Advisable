import React from "react";
import { CurrentUserToggle, StyledDropdownLink } from "./styles";
import { Link } from "react-router-dom";
import { ChevronDown } from "@styled-icons/heroicons-outline";
import useViewer from "../../hooks/useViewer";
import { Box, Avatar } from "@advisable/donut";
import Logout from "./Logout";
import Popover, { usePopoverState } from "./Popover";

export default function CurrentUser() {
  const viewer = useViewer();
  const popover = usePopoverState();

  return (
    <Popover
      state={popover}
      label="User menu"
      disclosure={
        <CurrentUserToggle>
          <Avatar
            size="xs"
            name={viewer.name}
            url={viewer.avatar}
            marginRight={2}
          />
          <ChevronDown size={12} />
        </CurrentUserToggle>
      }
    >
      <Box width="200px" paddingBottom={3}>
        <Box
          fontWeight={500}
          paddingX={5}
          marginBottom={2}
          paddingY={3}
          borderBottom="1px solid"
          borderColor="neutral100"
        >
          {viewer.name}
        </Box>
        {viewer.isSpecialist && viewer.isAccepted && (
          <StyledDropdownLink as={Link} to="/profile" onClick={popover.hide}>
            Profile
          </StyledDropdownLink>
        )}
        <StyledDropdownLink as={Link} to="/settings" onClick={popover.hide}>
          Settings
        </StyledDropdownLink>
        {viewer.isAdmin && (
          <StyledDropdownLink as="a" href="/admin">
            Admin
          </StyledDropdownLink>
        )}
        {viewer.isAdmin && (
          <StyledDropdownLink as="a" href="/toby">
            Toby
          </StyledDropdownLink>
        )}
        <Logout as={StyledDropdownLink}>Logout</Logout>
      </Box>
    </Popover>
  );
}
