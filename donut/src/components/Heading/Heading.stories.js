import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Heading from "./";

export default {
  title: "Content/Heading",
  decorators: [withKnobs],
};

export function Basic() {
  return (
    <Heading>Get Instant Access to World-Class Marketing Freelancers</Heading>
  );
}
