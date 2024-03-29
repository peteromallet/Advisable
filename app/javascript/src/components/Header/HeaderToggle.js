import React from "react";
import { motion } from "framer-motion";
import { Link, matchPath, useLocation } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";

const toggleClasses = composeStyles({
  base: "h-10 bg-neutral-100 p-1 rounded-full flex relative",
});

const toggleLinkClasses = composeStyles({
  base: "px-4 font-medium flex items-center relative text-neutral-600 hover:text-neutral-900 text-[14px]",
  variants: {
    active: "text-blue-800 hover:text-blue-800",
  },
});

const COLLABORATE_PATHS = [
  "/collaborate",
  "/payment_requests",
  "/messages",
  "/guild/*",
  "/post*",
  "/events/*",
  "/freelancers/apply/*",
];

function ToggleLink({ children, active, to }) {
  return (
    <Link to={to} className={toggleLinkClasses({ active })}>
      <span className="z-10">{children}</span>
    </Link>
  );
}

export function useIsCollaborationView() {
  const location = useLocation();

  const collaborationMatch = COLLABORATE_PATHS.some((path) => {
    return matchPath({ path }, location.pathname);
  });

  return Boolean(collaborationMatch);
}

export default function HeaderToggle() {
  const collaborationActive = useIsCollaborationView();

  const animation = {
    x: collaborationActive ? 84 : 0,
    width: collaborationActive ? 110 : 88,
  };

  return (
    <div className={toggleClasses()}>
      <ToggleLink active={!collaborationActive} to="/">
        Discover
      </ToggleLink>
      <ToggleLink active={collaborationActive} to="/collaborate">
        Collaborate
      </ToggleLink>
      <motion.div
        animate={animation}
        initial={animation}
        transition={{ type: "spring", stiffness: 100, damping: 10, mass: 0.3 }}
        className="absolute inset-1 z-0 bg-white rounded-full shadow"
      />
    </div>
  );
}
