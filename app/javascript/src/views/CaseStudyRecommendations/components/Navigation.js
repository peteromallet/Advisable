import React from "react";
import { Box } from "@advisable/donut";
import { Collection } from "@styled-icons/heroicons-solid/Collection";
import { Bookmark } from "@styled-icons/heroicons-solid/Bookmark";
import { InboxIn } from "@styled-icons/heroicons-solid/InboxIn";
import { Archive } from "@styled-icons/heroicons-solid/Archive";
import { Search } from "@styled-icons/heroicons-solid/Search";
import { PlusCircle } from "@styled-icons/heroicons-solid/PlusCircle";
import {
  StyledNavigationItem,
  StyledNavigationItemCount,
  StyledNewSearch,
} from "../styles";

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

export default function ExploreNavigation({ data }) {
  const companySearch = data.caseStudySearches.find(
    (s) => s.companyRecomendation,
  );
  const searches = data.caseStudySearches.filter(
    (s) => !s.companyRecomendation,
  );

  return (
    <>
      {companySearch && (
        <NavItem
          icon={Collection}
          to={`/explore/${companySearch.id}`}
          count={companySearch.results.nodes.length}
        >
          Recommendations
        </NavItem>
      )}
      {searches.map((s) => (
        <NavItem
          key={s.id}
          icon={Search}
          to={`/explore/${s.id}`}
          count={s.isFinalized ? s.results.nodes.length : 0}
        >
          {s.name}
        </NavItem>
      ))}
      <StyledNewSearch to="/explore/new">
        <PlusCircle />
        Create a new search
      </StyledNewSearch>
      <Box height={1} bg="neutral100" marginY={6} />
      <NavItem icon={Bookmark} to="/explore/favorites">
        Favorites
      </NavItem>
      <NavItem icon={InboxIn} to="/explore/shared">
        Shared
      </NavItem>
      <NavItem icon={Archive} to="/explore/archived">
        Archive
      </NavItem>
    </>
  );
}
