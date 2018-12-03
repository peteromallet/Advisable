import React, { useState } from "react";
import axios from "axios";
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
    apolloClient.writeData({
      data: {
        viewer: null
      }
    });

    const csrf = document.querySelector('meta[name="csrf-token"]').content;

    axios({
      method: "delete",
      url: "/api/v1/logout",
      headers: {
        "X-CSRF-Token": csrf
      }
    });
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
                <span>{query.data.viewer.client.name}</span>
              </CurrentUserToggle>
              <CurrentUserDropdown open={open}>
                <button onClick={() => handleLogout(query.client)}>
                  Logout
                </button>
              </CurrentUserDropdown>
            </CurrentUserWrapper>
          );

        return null;
      }}
    </Query>
  );
};

export default CurrentUser;
