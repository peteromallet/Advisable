import React from "react";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import Avatar from "./";
import Card from "../Card";

export default {
  title: 'Content/Avatar',
  decorators: [withKnobs],
};

export const avatar = () => {
  const url = text(
    "url",
    "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=1233&q=80",
  );
  const name = text("name", "Amanda Benton");
  const size = select("size", ["xxs", "xs", "s", "m", "l", "xl"], "m");

  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Avatar name={name} size={size} url={url} />
      <Avatar name="John Doe" siz={size} />
    </Card>
  );
};
