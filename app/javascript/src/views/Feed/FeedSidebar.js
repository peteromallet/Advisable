import {
  Bookmark,
  Collection,
  Home,
  InboxIn,
} from "@styled-icons/heroicons-solid";
import React, { cloneElement } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import { useInterests } from "./queries";

const sidebarClasses = composeStyles({
  base: `
    w-[320px]
    bg-white
    h-viewport
    shadow-lg
    shrink-0
    p-5
    sticky
    top-[var(--header-height)]
  `,
});

const sidebarItemClasses = composeStyles({
  base: `
    flex
    gap-2
    py-1.5
    px-2
    -mx-2
    mb-1
    group
    rounded-sm
    text-neutral600
    hover:text-neutral900
    hover:bg-neutral50
  `,
  variants: {
    active: `!text-neutral900 font-medium bg-neutral50`,
  },
});

const iconClasses = composeStyles({
  base: `w-5 text-neutral600 group-hover:text-neutral900`,
  variants: {
    active: `text-blue500 group-hover:text-blue500`,
  },
});

function SidebarItem({ to, icon, children }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link to={to} className={sidebarItemClasses({ active: match })}>
      {icon &&
        cloneElement(icon, { className: iconClasses({ active: match }) })}
      <span className="truncate">{children}</span>
    </Link>
  );
}

export default function FeedSidebar() {
  const { data, loading, error } = useInterests();
  const interests = data?.interests || [];

  return (
    <div className={sidebarClasses()}>
      <SidebarItem to="/feed" icon={<Home />}>
        Feed
      </SidebarItem>
      <SidebarItem to="/feed/favorites" icon={<Bookmark />}>
        Favorites
      </SidebarItem>
      <SidebarItem to="/feed/shared" icon={<InboxIn />}>
        Shared
      </SidebarItem>
      <h4 className="pt-8 pb-2 text-xs uppercase font-semibold text-neutral500">
        Your Interests
      </h4>
      {interests.map((interest) => (
        <SidebarItem
          key={interest.id}
          to={`/feed/${interest.id}`}
          icon={<Collection />}
        >
          {interest.term}
        </SidebarItem>
      ))}
    </div>
  );
}
