import { motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import React, { createElement } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import { useInterests } from "../queries";
import HomeIcon from "./HomeIcon";
import BookmarkIcon from "./BookmarkIcon";
import SharedIcon from "./SharedIcon";
import InterestIcon from "./InterestIcon";
import SearchIcon from "./SearchIcon";

const sidebarClasses = composeStyles({
  base: `
    w-[300px]
    bg-white
    h-viewport
    shadow
    shrink-0
    sticky
    top-[var(--header-height)]
    hidden md:block
  `,
});

const sidebarItemClasses = composeStyles({
  base: `
    flex
    gap-2
    py-1.5
    px-2
    mb-1
    group
    rounded-sm
    capitalize
    text-neutral500
    font-[450]
    hover:text-neutral900
    hover:bg-neutral50
  `,
  variants: {
    active: `!text-blue900 bg-neutral50`,
  },
});

const iconClasses = composeStyles({
  base: `w-5 shrink-0 opacity-80 group-hover:opacity-100`,
  variants: {
    active: `!opacity-100`,
  },
});

function SidebarItem({ to, icon, children, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved?.pathname, end: true });

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      {...props}
      to={to}
      onClick={handleClick}
      className={sidebarItemClasses({ active: match })}
    >
      {icon &&
        createElement(icon, {
          primaryColor: match
            ? "var(--color-blue600)"
            : "var(--color-neutral900)",
          secondaryColor: match
            ? "var(--color-blue200)"
            : "var(--color-neutral400)",
          className: iconClasses({ active: match }),
        })}
      <span className="truncate">{children}</span>
    </Link>
  );
}

function Interests() {
  const { data, loading } = useInterests();
  const interests = data?.interests || [];

  if (loading) {
    return (
      <div className="flex flex-col gap-3 px-3">
        <div className="h-2 w-[100px] rounded-md bg-neutral100 animate-pulse" />
        <div className="h-4 w-full rounded-md bg-neutral100 animate-pulse" />
        <div className="h-4 w-full rounded-md bg-neutral100 animate-pulse" />
        <div className="h-4 w-full rounded-md bg-neutral100 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <h4 className="pl-2 pb-2 text-xs uppercase font-semibold text-neutral400">
        Your topics
      </h4>
      {interests.map((interest) => (
        <SidebarItem
          key={interest.id}
          to={`/explore/${interest.id}`}
          icon={InterestIcon}
        >
          {interest.term}
        </SidebarItem>
      ))}
    </>
  );
}

export default function FeedSidebar() {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={sidebarClasses()}
    >
      <SimpleBar className="h-full p-4">
        <div className="mb-8">
          <SidebarItem to="/explore" icon={HomeIcon}>
            Feed
          </SidebarItem>
          <SidebarItem to="/explore/search" icon={SearchIcon}>
            Search
          </SidebarItem>
          <SidebarItem to="/explore/bookmarks" icon={BookmarkIcon}>
            Bookmarks
          </SidebarItem>
          {/* <SidebarItem to="/explore/shared" icon={SharedIcon}>
            Shared
          </SidebarItem> */}
        </div>
        <div data-walkthrough="interests">
          <Interests />
        </div>
      </SimpleBar>
    </motion.div>
  );
}
