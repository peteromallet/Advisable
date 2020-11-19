import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useSharedState } from "./SharedStateProvider";

export const StyledOrbitsSystem = styled.svg`
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
`;

function circlePath(cx, cy, r) {
  return (
    "M " +
    cx +
    " " +
    cy +
    " m -" +
    r +
    ", 0 a " +
    r +
    "," +
    r +
    " 0 1,0 " +
    r * 2 +
    ",0 a " +
    r +
    "," +
    r +
    " 0 1,0 -" +
    r * 2 +
    ",0"
  );
}

export function Orbit({
  stroke,
  fill,
  index,
  path,
  transition = { duration: 0.5 },
}) {
  const [state, setState] = useSharedState();
  const id = `orbit-${index}`;
  const d = circlePath(path.x, path.y, path.size);
  const animate = useMemo(() => ({ d, fill, stroke }), [d, fill, stroke]);
  const initial = state?.[id] || animate;

  useEffect(() => {
    // Store previous params
    state?.[id] !== animate && setState?.((s) => ({ ...s, [id]: animate }));
  }, [animate, id, setState, state]);

  return (
    <motion.path initial={initial} animate={animate} transition={transition} />
  );
}

export default function OrbitsSystem({
  children,
  x = 0,
  y = 0,
  stroke = "black",
  fill = "transparent",
  startSize = 0,
  offsetX = 0,
  offsetY = 0,
  increment = 200,
  transition,
}) {
  const orbits = React.Children.map(children, (child, i) => {
    const orbitSize = startSize + (i + 1) * increment;
    const orbitX = x - offsetX * i;
    const orbitY = y - offsetY * i;
    const path = {
      size: orbitSize,
      x: orbitX,
      y: orbitY,
    };

    return React.cloneElement(child, {
      key: i,
      index: i,
      path,
      transition,
      stroke: child.props.stroke || stroke,
      fill: child.props.fill || fill,
    });
  }).reverse();

  return <StyledOrbitsSystem>{orbits}</StyledOrbitsSystem>;
}
