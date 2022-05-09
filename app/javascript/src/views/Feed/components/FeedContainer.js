import React from "react";
import composeStyles from "src/utilities/composeStyles";

const classes = composeStyles({
  base: `max-w-[860px] mx-auto py-8 px-5`,
});

export default function FeedContainer({ children, className, ...props }) {
  return <div className={classes({ className })}>{children}</div>;
}
