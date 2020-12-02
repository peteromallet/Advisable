import React from "react";
import { useMutation } from "@apollo/client";
import { Avatar } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { Link } from "react-router-dom";
import {
  StyledCurrentUser,
  StyledCurrentUserMenu,
  StyledCurrentUserArrow,
  StyledCurrentUserMenuItem,
} from "./styles";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";
import { LOGOUT } from "./queries";

const CurrentUser = () => {
  const viewer = useViewer();
  const menu = useMenuState();
  const [logout] = useMutation(LOGOUT, { variables: { input: {} } });

  if (!viewer) return null;

  const handleLogout = async () => {
    await logout();
    window.location = "/login";
  };

  return (
    <>
      <MenuButton {...menu}>
        {(props) => (
          <StyledCurrentUser {...props}>
            <Avatar
              size="xs"
              mr={3}
              bg="neutral900"
              name={viewer.name}
              url={viewer.avatar}
            />
            <StyledCurrentUserArrow />
          </StyledCurrentUser>
        )}
      </MenuButton>
      <Menu {...menu}>
        {(props) => (
          <StyledCurrentUserMenu width="180px" {...props}>
            <MenuItem {...menu}>
              {(menuItemProps) => (
                <StyledCurrentUserMenuItem
                  {...menuItemProps}
                  as={Link}
                  to="/your-posts"
                  onClick={menu.hide}
                >
                  Your posts
                </StyledCurrentUserMenuItem>
              )}
            </MenuItem>
            <MenuItem {...menu}>
              {(menuItemProps) => (
                <StyledCurrentUserMenuItem as="a" href="/" {...menuItemProps}>
                  Back to Advisable
                </StyledCurrentUserMenuItem>
              )}
            </MenuItem>
            <MenuItem {...menu}>
              {(menuItemProps) => (
                <StyledCurrentUserMenuItem
                  {...menuItemProps}
                  onClick={handleLogout}
                >
                  Logout
                </StyledCurrentUserMenuItem>
              )}
            </MenuItem>
          </StyledCurrentUserMenu>
        )}
      </Menu>
    </>
  );
};

export default CurrentUser;
