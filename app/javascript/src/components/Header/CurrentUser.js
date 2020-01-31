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

const CurrentUser = ({ onLogout }) => {
  const viewer = useViewer();
  const [open, setOpen] = useState(false);
  const handleBlur = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  let isClient = get?.__typename === "User";

  React.useEffect(() => {
    if (!window.Rollbar) return;
    if (viewer) {
      Rollbar.configure({
        payload: {
          environment: process.env.ROLLBAR_ENV,
          person: {
            id: viewer.airtableId,
            email: viewer.email,
          },
        },
      });

      Sentry.configureScope(scope => {
        scope.setUser({
          id: viewer.id,
          email: viewer.email,
          username: viewer.name,
        });
      });
    } else {
      Rollbar.configure({
        payload: {
          environment: process.env.ROLLBAR_ENV,
        },
      });

      Sentry.configureScope(scope => {
        scope.setUser(null);
      });
    }
  });

  if (!viewer) return null;

  return (
    <CurrentUserWrapper tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
      <CurrentUserToggle>
        <strong>{viewer.firstName}</strong>
        {viewer.companyName && <span>{viewer.companyName}</span>}
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
