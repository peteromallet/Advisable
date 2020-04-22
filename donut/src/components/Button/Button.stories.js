import React from "react";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import Button from "./";
import Box from "../Box";
import Card from "../Card";
import { Download, ArrowRight, Plus } from "@styled-icons/heroicons-outline";

export default {
  title: "Button",
  decorators: [withKnobs],
};

export const basic = () => {
  const label = text("Label", "Save Changes");
  const size = select("Size", ["s", "m", "l"], "m");
  const disabled = boolean("Disabled", false);
  const loading = boolean("Loading", false);
  const variant = select(
    "Variant",
    ["primary", "secondary", "subtle", "ghost"],
    "primary",
  );
  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          size={size}
          variant={variant}
          disabled={disabled}
          loading={loading}
        >
          {label}
        </Button>
      </Box>
    </Card>
  );
};

export const withPrefix = () => {
  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button prefix={<Download />}>Download</Button>
      </Box>
    </Card>
  );
};

export const withSuffix = () => {
  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button suffix={<ArrowRight />}>Continue</Button>
      </Box>
    </Card>
  );
};

export const loadingButton = () => {
  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button loading>Continue</Button>
      </Box>
    </Card>
  );
};

export const iconButton = () => {
  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button variant="subtle">
          <Plus />
        </Button>
      </Box>
    </Card>
  );
};
