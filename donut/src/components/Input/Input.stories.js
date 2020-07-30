import React from "react";
import { Phone } from "@styled-icons/feather";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import Input from "./";
import Card from "../Card";

export default {
<<<<<<< HEAD
  title: "Forms|Input",
=======
  title: "Input",
>>>>>>> Add new input components
  decorators: [withKnobs],
};

export const basicInput = () => {
  const prefix = text("Prefix", null);
  const suffix = text("Suffix", null);
  const disabled = boolean("Disabled", false);
  const error = boolean("Error", false);
  const size = select("Size", ["sm", "md", "lg"], "md");

  return (
    <Card marginTop="l" padding="xl" maxWidth={500} mx="auto">
      <Input
        size={size}
        error={error}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        placeholder="Type something"
      />
    </Card>
  );
};

export const prefix = () => {
  return (
    <Card padding="xl" maxWidth={500} mx="auto">
      <Input prefix={<Phone />} placeholder="Phone Number" />
    </Card>
  );
};

export const error = () => {
  return (
    <Card padding="xl" maxWidth={500} mx="auto">
      <Input error placeholder="This has an error" />
    </Card>
  );
};

export const sizes = () => {
  return (
    <Card padding="xl" maxWidth={500} mx="auto">
      <Input marginBottom="m" size="sm" placeholder="Type something" />
      <Input marginBottom="m" size="md" placeholder="Type something" />
      <Input marginBottom="m" size="lg" placeholder="Type something" />
    </Card>
  );
};

export const password = () => {
  return (
    <Card padding="xl" maxWidth={500} mx="auto">
      <Input type="password" placeholder="Password" />
    </Card>
  );
};
