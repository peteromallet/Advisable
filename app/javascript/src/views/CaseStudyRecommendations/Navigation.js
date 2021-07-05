import React from "react";
import { Box } from "@advisable/donut";
import { Collection } from "@styled-icons/heroicons-solid/Collection";
import { Bookmark } from "@styled-icons/heroicons-solid/Bookmark";
import { InboxIn } from "@styled-icons/heroicons-solid/InboxIn";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { PlusCircle } from "@styled-icons/heroicons-solid/PlusCircle";
import {
  StyledNavigationItem,
  StyledNavigationItemCount,
  StyledNewSearch,
} from "./styles";

function NavItem({ icon, children, count, ...props }) {
  return (
    <StyledNavigationItem {...props}>
      {icon ? React.createElement(icon) : null}
      <span>{children}</span>
      {count ? (
        <StyledNavigationItemCount>{count}</StyledNavigationItemCount>
      ) : null}
    </StyledNavigationItem>
  );
}

export default function ExploreNavigation() {
  return (
    <Box padding={4}>
      <NavItem icon={Collection} to="/explore/inbox" count={12}>
        Recommendations
      </NavItem>
      <StyledNewSearch as="button">
        <PlusCircle />
        Create a new search
      </StyledNewSearch>
      <Box height={1} bg="neutral100" marginY={6} />
      <NavItem icon={InboxIn} to="/explore/shared" count={4}>
        Shared
      </NavItem>
      <NavItem icon={Bookmark} to="/explore/favorites">
        Favorites
      </NavItem>
      <NavItem icon={Trash} to="/explore/archived">
        Archived
      </NavItem>
    </Box>
  );
}
