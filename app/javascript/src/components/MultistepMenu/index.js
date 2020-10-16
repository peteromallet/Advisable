import { Children, cloneElement } from "react";
import { Box } from "@advisable/donut";
import MultistepMenuItem from "./MultistepMenuItem";

function MultistepMenu({ children, ...props }) {
  const items = Children.toArray(children);
  return (
    <Box {...props}>
      {items.map((child, i) => {
        if (child === null) return null;
        return cloneElement(child, { number: i + 1 });
      })}
    </Box>
  );
}

MultistepMenu.Item = MultistepMenuItem;

export default MultistepMenu;
