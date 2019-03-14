import React, { useState } from "react";
import {
  CurrentUserWrapper,
  CurrentUserToggle,
  CurrentUserDropdown,
} from "./styles";

const CurrentUser = ({ user, onLogout }) => {
  if (!user) return null;

  const [open, setOpen] = useState(false);
  const handleBlur = () => setOpen(false);
  const handleFocus = () => setOpen(true);

  return (
    <CurrentUserWrapper tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
      <CurrentUserToggle>
        <strong>{user.firstName}</strong>
        {user.companyName && (
          <span>{user.companyName}</span>
        )}
      </CurrentUserToggle>
      <CurrentUserDropdown open={open}>
        <a href="#" onClick={onLogout}>
          Logout
        </a>
      </CurrentUserDropdown>
    </CurrentUserWrapper>
  );
};

export default CurrentUser;
