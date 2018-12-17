import React, { useState } from "react";
import { Query } from "react-apollo";
import VIEWER from "../AuthenticatedRoute/viewer.graphql";
import {
  CurrentUserWrapper,
  CurrentUserToggle,
  CurrentUserDropdown
} from "./styles";

const CurrentUser = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = apolloClient => {
    localStorage.removeItem("authToken");
    apolloClient.resetStore();
  };

  const handleBlur = () => setOpen(false);
  const handleFocus = () => setOpen(true);

  return (
    <Query query={VIEWER}>
      {query => {
        if (query.loading) return null;

        if (query.data.viewer)
          return (
            <CurrentUserWrapper
              tabIndex="0"
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <CurrentUserToggle>
                <strong>{query.data.viewer.firstName}</strong>
                {query.data.viewer.companyName && (
                  <span>{query.data.viewer.companyName}</span>
                )}
              </CurrentUserToggle>
              <CurrentUserDropdown open={open}>
                <a href="#" onClick={() => handleLogout(query.client)}>
                  Logout
                </a>
              </CurrentUserDropdown>
            </CurrentUserWrapper>
          );

        return null;
      }}
    </Query>
  );
};

export default CurrentUser;
