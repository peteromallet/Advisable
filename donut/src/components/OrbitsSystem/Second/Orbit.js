import React, { useEffect, useMemo, useRef, useState } from "react";

const round = (number) => Math.round(number * 1e6) / 1e6;

const renderCircle = (radius, numOfVertexes, posX, posY) => {
  let vertexes = [];
  for (let i = 0; i <= numOfVertexes; i++) {
    let radians = ((Math.PI * 2) / numOfVertexes) * i;
    let cosx = round(Math.cos(radians));
    let siny = round(Math.sin(radians));
    let x = cosx * radius + posX;
    let y = siny * radius + posY;
    if (i === 0) {
      // Set M point
      const string = `M ${x}, ${y}`;
      vertexes[i] = { x, y, string, radians };
      continue;
    }
    let armLength = (4 / 3) * Math.tan(Math.PI / (2 * numOfVertexes));
    let armLengthScaled = armLength * radius;
    let firstArmRadians = vertexes[i - 1].radians + Math.PI / 2; // angle + 90 from the previous point angle
    let secondArmRadians = radians - Math.PI / 2; // angle + 90 from cur point
    let cosx1 = round(Math.cos(firstArmRadians));
    let cosx2 = round(Math.cos(secondArmRadians));
    let siny1 = round(Math.sin(firstArmRadians));
    let siny2 = round(Math.sin(secondArmRadians));
    let x1 = cosx1 * armLengthScaled + vertexes[i - 1].x;
    let x2 = cosx2 * armLengthScaled + x;
    let y1 = siny1 * armLengthScaled + vertexes[i - 1].y;
    let y2 = siny2 * armLengthScaled + y;
    const string = `C ${x1}, ${y1} ${x2}, ${y2} ${x}, ${y}`;
    vertexes[i] = { x, y, string, radians };
    if (i === numOfVertexes)
      // Setup end
      vertexes[i + 1] = { string: "Z" };
  }
  let matrix = vertexes.map((vertex) => vertex.string);
  return matrix.join("\n");
};

export function Orbit({
  index,
  radius,
  cx,
  cy,
  stroke,
  fill,
  strokeWidth,
  children,
  ...props
}) {
  const circle = useMemo(() => renderCircle(radius, 3, cx, cy), [
    cx,
    cy,
    radius,
  ]);

  const pathRef = useRef(null);
  const fillRef = useRef(null);
  const strokeRef = useRef(null);
  const [pathQueue, setPathQueue] = useState([circle]);
  const [fillQueue, setFillQueue] = useState([fill]);
  const [strokeQueue, setStrokeQueue] = useState([stroke]);
  useEffect(() => {
    circle !== pathQueue[0] && setPathQueue([circle, ...pathQueue]);
    circle !== pathQueue[0] && pathRef?.current?.beginElement();
    fill !== fillQueue[0] && setFillQueue([fill, ...fillQueue]);
    fill !== fillQueue[0] && fillRef?.current?.beginElement();
    stroke !== strokeQueue[0] && setStrokeQueue([stroke, ...strokeQueue]);
    stroke !== strokeQueue[0] && strokeRef?.current?.beginElement();
  }, [circle, fill, fillQueue, pathQueue, stroke, strokeQueue]);

  const animateAttributes = {
    fill: "freeze",
    dur: "1.2s",
    repeatCount: "1",
    calcMode: "spline",
    keyTimes: "0; 1",
    keySplines: ".75, 0, .25, 1;",
    restart: "always",
  };

  return (
    <>
      <path
        layout
        key={index}
        id={`orbit-path-${index}`}
        d={pathQueue[0]}
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
        {...props}
      >
        <animate
          {...animateAttributes}
          ref={pathRef}
          attributeName="d"
          from={pathQueue[1]}
          to={pathQueue[0]}
        />
        <animate
          {...animateAttributes}
          ref={fillRef}
          attributeName="fill"
          from={fillQueue[1]}
          to={fillQueue[0]}
        />
        <animate
          {...animateAttributes}
          ref={strokeRef}
          attributeName="stroke"
          from={strokeQueue[1]}
          to={strokeQueue[0]}
        />
      </path>
      {children && children(pathQueue[0])}
    </>
  );
  // return (
  //   <circle
  //     cx={cx}
  //     cy={cy}
  //     r={radius}
  //     stroke={stroke}
  //     fill={fill}
  //     strokeWidth={strokeWidth}
  //   />
  // );
}

export default Orbit;
