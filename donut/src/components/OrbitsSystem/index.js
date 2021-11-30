import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useSharedOrbits } from "./SharedOrbitsProvider";
import { useBreakpoints } from "@advisable/donut";

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
  strokeWidth,
  strokeOpacity,
  transition = { duration: 0.5 },
}) {
  const [state, setState] = useSharedOrbits();
  const id = `orbit-${index}`;
  const d = circlePath(path.x, path.y, path.size);
  const animate = useMemo(() => ({ d, fill, stroke }), [d, fill, stroke]);
  const initial = state?.[id] || animate;

  useEffect(() => {
    // Store previous params
    state?.[id] !== animate && setState?.((s) => ({ ...s, [id]: animate }));
  }, [animate, id, setState, state]);

  return (
    <motion.path
      initial={initial}
      animate={animate}
      transition={transition}
      strokeWidth={strokeWidth}
      strokeOpacity={strokeOpacity}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function useResponsiveProp(prop) {
  const breakpoints = useBreakpoints();

  if (!prop) return prop;
  if (Array.isArray(prop)) {
    throw "Orbits system does not support responsive props as an array";
  }

  if (typeof prop === "object") {
    const matched = Object.keys(prop)
      .slice()
      .reverse()
      .find((breakpoint) => breakpoints[breakpoint]);
    return matched ? prop[matched] : prop._ || null;
  }

  return prop;
}

export default function OrbitsSystem({
  children,
  x = 0,
  y = 0,
  stroke = "black",
  strokeWidth,
  fill = "transparent",
  startSize = 0,
  offsetX = 0,
  offsetY = 0,
  increment = 200,
  viewBox = null,
  preserveAspectRatio = null,
  transition,
}) {
  const responsiveIncrement = useResponsiveProp(increment);
  const responsiveOffsetX = useResponsiveProp(offsetX);
  const responsiveOffsetY = useResponsiveProp(offsetY);
  const responsiveX = useResponsiveProp(x);
  const responsiveY = useResponsiveProp(y);
  const responsiveViewBox = useResponsiveProp(viewBox);
  const respPreserveAspectRatio = useResponsiveProp(preserveAspectRatio);

  const orbits = React.Children.map(children, (child, i) => {
    const orbitSize = startSize + (i + 1) * responsiveIncrement;
    const orbitX = responsiveX - responsiveOffsetX * i;
    const orbitY = responsiveY - responsiveOffsetY * i;
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
      strokeWidth: child.props.strokeWidth || strokeWidth,
      stroke: child.props.stroke || stroke,
      fill: child.props.fill || fill,
    });
  }).reverse();

  return (
    <StyledOrbitsSystem
      viewBox={responsiveViewBox}
      preserveAspectRatio={respPreserveAspectRatio}
    >
      {orbits && orbits}
    </StyledOrbitsSystem>
  );
}
