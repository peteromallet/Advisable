import React, { useCallback, useState } from "react";
import "./styles.css";
import GridHighlight from "./GridHighlight";
import random from "src/utilities/random";
import generateID from "src/utilities/generateID";

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomHighlight(size) {
  return {
    id: generateID("high"),
    direction: random(["up", "down"]),
    offset: randomNumberBetween(0 - size, size),
  };
}

function initialHighlights(n, size) {
  return new Array(n).fill(0).map(() => generateRandomHighlight(size));
}

const NUMBER_OF_HIGHLIGHTS = 10;
function Highlights({ size }) {
  const [highlights, setHighlights] = useState(
    initialHighlights(NUMBER_OF_HIGHLIGHTS, size),
  );

  const replaceHighlight = useCallback(
    (id) => {
      setHighlights((existing) => {
        const filtered = existing.filter((h) => h.id !== id);
        return [...filtered, generateRandomHighlight(size)];
      });
    },
    [size],
  );

  return highlights.map((highlight) => {
    return (
      <GridHighlight
        key={highlight.id}
        {...highlight}
        onComplete={replaceHighlight}
      />
    );
  });
}

// Renders a background pattern of grid lines.
// Should be rendered inside of a containing div with relative positioning.
// and overflow: hidden.
export default function GridLines({
  children,
  color,
  size = 24,
  highlight = "#FFFFFF",
}) {
  const style = {
    "--size": size,
    "--grid-color": color,
    "--grid-highlight-start": highlight,
    "--grid-highlight-end": `${highlight}00`,
  };

  return (
    <div className="grid-lines" style={style}>
      <Highlights size={size} />
      <div className="grid-lines-content">{children}</div>
    </div>
  );
}
