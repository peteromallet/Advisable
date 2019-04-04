import React, { useState } from "react";
import {
  CurrentUserWrapper,
  CurrentUserToggle,
  CurrentUserDropdown,
} from "./styles";

const CurrentUser = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const handleBlur = () => setOpen(false);
  const handleFocus = () => setOpen(true);

  React.useEffect(() => {
    if (!window.Rollbar) return;
    if (user) {
      Rollbar.configure({
        payload: {
          environment: process.env.ROLLBAR_ENV,
          person: {
            id: user.airtableId,
            email: user.email,
          },
        },
      });
    } else {
      Rollbar.configure({
        payload: {
          environment: process.env.ROLLBAR_ENV
        }
      })
    }
  });

  if (!user) return null;

  return (
    <CurrentUserWrapper tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
      <CurrentUserToggle>
        <strong>{user.firstName}</strong>
        {user.companyName && <span>{user.companyName}</span>}
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
