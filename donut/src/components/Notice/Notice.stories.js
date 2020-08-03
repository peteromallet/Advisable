import React from "react";
import { AlertTriangle } from "@styled-icons/feather";
import { withKnobs, select } from "@storybook/addon-knobs";
import Notice from "./";
import Card from "../Card";

export default {
  title: "Content|Notice",
  decorators: [withKnobs],
};

export const notice = () => {
  const variant = select("variant", ["neutral", "orange", "cyan"], "neutral");

  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Notice
        icon={<AlertTriangle />}
        variant={variant}
        title="This is an alert"
      >
        This is the content for an alert message.
      </Notice>
    </Card>
  );
};
