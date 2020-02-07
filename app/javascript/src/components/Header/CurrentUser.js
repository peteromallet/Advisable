import { get } from "lodash";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Sentry from "@sentry/browser";
import {
  CurrentUserWrapper,
  CurrentUserToggle,
  CurrentUserDropdown,
} from "./styles";
import useViewer from "../../hooks/useViewer";
import clientConfig from "../../clientConfig";

const CurrentUser = ({ user, onLogout }) => {
  const viewer = useViewer();
  const [open, setOpen] = useState(false);
  const handleBlur = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  let isClient = get(viewer, "__typename") === "User";

  React.useEffect(() => {
    if (!window.Rollbar) return;
    if (user) {
      Rollbar.configure({
        payload: {
          environment: clientConfig.ROLLBAR_ENV,
          person: {
            id: user.airtableId,
            email: user.email,
          },
        },
      });

      Sentry.configureScope(scope => {
        scope.setUser({
          id: user.id,
          email: user.email,
          username: user.name,
        });
      });
    } else {
      Rollbar.configure({
        payload: {
          environment: clientConfig.ROLLBAR_ENV,
        },
      });

      Sentry.configureScope(scope => {
        scope.setUser(null);
      });
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
        {isClient && <Link to="/settings">Settings</Link>}
        <a href="#" onClick={onLogout}>
          Logout
        </a>
      </CurrentUserDropdown>
    </CurrentUserWrapper>
  );
};

export default CurrentUser;
