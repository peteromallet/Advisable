import React, { useState } from "react";
import { get } from "lodash-es";
import { Link } from "react-router-dom";
import {
  CurrentUserWrapper,
  CurrentUserToggle,
  CurrentUserDropdown,
} from "./styles";
import useViewer from "../../hooks/useViewer";

const CurrentUser = ({ user, onLogout }) => {
  const viewer = useViewer();
  const [open, setOpen] = useState(false);
  const handleBlur = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  let isClient = get(viewer, "__typename") === "User";
  let isAdmin = isClient && viewer?.isAdmin;

  return (
    <CurrentUserWrapper tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
      <CurrentUserToggle>
        <strong>{user.firstName}</strong>
        {user.companyName && <span>{user.companyName}</span>}
      </CurrentUserToggle>
      <CurrentUserDropdown open={open}>
        {user.guild && <a href="/guild">Guild</a>}
        <Link to="/settings">Settings</Link>
        {isAdmin && <a href="/admin">Admin</a>}
        <a href="#" onClick={onLogout}>
          Logout
        </a>
      </CurrentUserDropdown>
    </CurrentUserWrapper>
  );
};

export default CurrentUser;
