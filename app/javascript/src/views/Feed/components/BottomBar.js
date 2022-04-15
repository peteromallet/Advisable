import React, { createElement } from "react";
import { useResolvedPath, useMatch } from "react-router-dom";
import { Bookmark, Home, InboxIn } from "@styled-icons/heroicons-solid";
import { Link } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";

const bottomBarClasses = composeStyles({
  base: `
    fixed
    left-0
    right-0
    bottom-0
    h-16
    bg-white
    z-10
    shadow
    flex
    justify-center
    gap-10
    border-t
    border-solid
    border-neutral100

    block md:hidden
  `,
});

const itemClasses = composeStyles({
  base: `
    flex
    flex-col
    gap-0.5
    items-center
    justify-center
  `,
});

const iconClasses = composeStyles({
  base: `w-6 h-6 text-neutral500`,
  variants: {
    active: `!text-blue500`,
  },
});

const labelClasses = composeStyles({
  base: `text-xs text-neutral500 font-medium`,
  variants: {
    active: `!text-neutral900`,
  },
});

function BottomBarItem({ to, icon, children }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} className={itemClasses({ active: match })}>
      {createElement(icon, { className: iconClasses({ active: match }) })}
      <span className={labelClasses({ active: match })}>{children}</span>
    </Link>
  );
}

export default function BottomBar() {
  return (
    <div className={bottomBarClasses()}>
      <BottomBarItem to="/explore" icon={Home}>
        Feed
      </BottomBarItem>
      <BottomBarItem to="/explore/favorites" icon={Bookmark}>
        Saved
      </BottomBarItem>
      <BottomBarItem to="/explore/sahred" icon={InboxIn}>
        Shared
      </BottomBarItem>
    </div>
  );
}
