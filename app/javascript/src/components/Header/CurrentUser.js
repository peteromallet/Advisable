import React, { useState } from "react";
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
  const isClient = viewer?.__typename === "User";
  let isAdmin = isClient && viewer?.isAdmin;
  const isAccepted = viewer?.isAccepted;

  return (
    <CurrentUserWrapper tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
      <CurrentUserToggle>
        <strong>{user.firstName}</strong>
        {user.companyName && <span>{user.companyName}</span>}
      </CurrentUserToggle>
      <CurrentUserDropdown open={open}>
        {viewer.isSpecialist && isAccepted && (
          <Link to="/profile">Your profile</Link>
        )}
        <Link to="/settings">Settings</Link>
        {isAdmin && <a href="/admin">Admin</a>}
        {isAdmin && <a href="/toby">Toby</a>}
        <a href="#" onClick={onLogout}>
          Logout
        </a>
      </CurrentUserDropdown>
    </CurrentUserWrapper>
  );
};

export default CurrentUser;
