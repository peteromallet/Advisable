import React from "react";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import {
  StyledDropdown,
  CurrentUserToggle,
  StyledDropdownLink,
} from "./styles";
import { ChevronDown } from "@styled-icons/heroicons-outline";
import useViewer from "../../hooks/useViewer";
import { Box, Avatar } from "@advisable/donut";

const CurrentUser = ({ user, onLogout }) => {
  const viewer = useViewer();
  const popover = usePopoverState({
    placement: "top-end",
  });
  const isClient = viewer?.__typename === "User";
  let isAdmin = isClient && viewer?.isAdmin;
  const isAccepted = viewer?.isAccepted;

  return (
    <>
      <PopoverDisclosure {...popover}>
        {(props) => (
          <CurrentUserToggle {...props}>
            <Avatar
              size="xs"
              name={user.name}
              url={user.avatar}
              marginRight={2}
            />
            <ChevronDown size={12} />
          </CurrentUserToggle>
        )}
      </PopoverDisclosure>
      <Popover {...popover} aria-label="User menu">
        {(props) => (
          <StyledDropdown {...props}>
            <Box width="200px" paddingY={3}>
              {viewer.isSpecialist && isAccepted && (
                <StyledDropdownLink to="/profile" onClick={popover.hide}>
                  Profile
                </StyledDropdownLink>
              )}
              <StyledDropdownLink to="/settings" onClick={popover.hide}>
                Settings
              </StyledDropdownLink>
              {isAdmin && (
                <StyledDropdownLink as="a" href="/admin">
                  Admin
                </StyledDropdownLink>
              )}
              {isAdmin && (
                <StyledDropdownLink as="a" href="/toby">
                  Toby
                </StyledDropdownLink>
              )}
              <StyledDropdownLink as="a" href="#" onClick={onLogout}>
                Logout
              </StyledDropdownLink>
            </Box>
          </StyledDropdown>
        )}
      </Popover>
    </>
  );
};

export default CurrentUser;
