import React from "react";
import { Box, theme } from "@advisable/donut";

const Colors = {
  blue: {
    stroke: theme.colors.blue200,
    fill: theme.colors.blue100,
  },
  orange: {
    stroke: theme.colors.orange300,
    fill: theme.colors.orange100,
  },
  cyan: {
    stroke: theme.colors.cyan300,
    fill: theme.colors.cyan100,
  },
  purple: {
    fill: "#F2EFFC",
    stroke: "#DEDBE8",
  },
};

const OrbitSvg = ({ fill, stroke }) => (
  <svg width="100%">
    <path
      d="M 1400 -50 m -1020, 0 a 1020,1020 0 1,0 2040,0 a 1020,1020 0 1,0 -1840,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 900 -50 m -1020, 0 a 1020,1020 0 1,0 2040,0 a 1020,1020 0 1,0 -1840,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 700 -50 m -920, 0 a 920,920 0 1,0 1840,0 a 920,920 0 1,0 -1840,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 600 -50 m -820, 0 a 820,820 0 1,0 1640,0 a 820,820 0 1,0 -1640,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 500 -50 m -720, 0 a 720,720 0 1,0 1440,0 a 720,720 0 1,0 -1440,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 400 -50 m -600, 0 a 600,600 0 1,0 1200,0 a 600,600 0 1,0 -1200,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 300 -50 m -480, 0 a 480,480 0 1,0 960,0 a 480,480 0 1,0 -960,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 200 -50 m -360, 0 a 360,360 0 1,0 720,0 a 360,360 0 1,0 -720,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 100 -50 m -240, 0 a 240,240 0 1,0 480,0 a 240,240 0 1,0 -480,0"
      fill={fill}
      stroke={stroke}
    ></path>
    <path
      d="M 0 -50 m -120, 0 a 120,120 0 1,0 240,0 a 120,120 0 1,0 -240,0"
      fill={fill}
      stroke={stroke}
    ></path>
  </svg>
);

export default function OrbitsBackground({ color = "blue", ...props }) {
  return (
    <Box
      display="flex"
      width="100%"
      position="relative"
      overflow="hidden"
      {...props}
    >
      <OrbitSvg {...Colors[color]} />
    </Box>
  );
}
