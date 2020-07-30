import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import Tags from "../Tags";
import Card from "../Card";

export default {
  title: "Content|Tags",
  decorators: [withKnobs],
};

export const tags = () => {
  const size = select("size", ["s", "m"], "s");
  const variant = select("variant", ["neutral", "dark"], "neutral");

  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Tags size={size} tags={["One", "Two", "Three"]} variant={variant} />
    </Card>
  );
};
