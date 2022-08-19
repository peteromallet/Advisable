import React from "react";
import "./styles.css";
import GridHighlight from "./GridHighlight";

// Renders a background pattern of grid lines.
// Should be rendered inside of a containing div with relative positioning.
// and overflow: hidden.
export default function GridLines({
  children,
  color,
  size,
  highlight = "#FFFFFF",
}) {
  const style = {
    "--grid-color": color,
    "--grid-size": size,
    "--grid-highlight-start": highlight,
    "--grid-highlight-end": `${highlight}00`,
  };

  return (
    <div className="grid-lines" style={style}>
      <GridHighlight offset={20} />
      <GridHighlight offset={12} />
      <GridHighlight offset={8} />
      <GridHighlight offset={2} />
      <GridHighlight offset={-4} />
      <GridHighlight offset={-12} />
      <GridHighlight offset={-18} />
      <GridHighlight direction="up" offset={0} />
      <GridHighlight direction="up" offset={6} />
      <GridHighlight direction="up" offset={12} />
      <GridHighlight direction="up" offset={20} />
      <GridHighlight direction="up" offset={-6} />
      <GridHighlight direction="up" offset={-12} />
      <GridHighlight direction="up" offset={-20} />
      <div className="grid-lines-content">{children}</div>
    </div>
  );
}
