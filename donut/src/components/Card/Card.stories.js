import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import Card from "./";
import Box from "../Box";

export default {
  title: 'Content/Card',
  decorators: [withKnobs],
};

export const card = () => {
  const elevation = select("elevation", ["none", "s", "m", "l", "xl"], "m");

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        elevation={elevation}
        width="600px"
        height="400px"
        mx="auto"
        my="60px"
      />
    </Box>
  );
};

export const bordered = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        variant="bordered"
        elevation="none"
        width="600px"
        height="400px"
        mx="auto"
        my="60px"
      />
    </Box>
  );
};
