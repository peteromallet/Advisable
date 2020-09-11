import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import Paragraph from "./";
import Card from "../Card";

export default {
  title: 'Content/Paragraph',
  decorators: [withKnobs],
};

const sampleText =
  "Get Instant Access to World-Class Marketing Freelancers. Across 600+ different marketing skills, get instant recommendations of talent you can trust, backed by a no questions asked money-back guarantee.";

export const basic = () => {
  const size = select("fontSize", ["2xs", "xs", "sm", "md", "lg"], "2xs");

  return (
    <Card maxWidth="700px" mx="auto" my="60px" padding="48px">
      <Paragraph size={size}>{sampleText}</Paragraph>
    </Card>
  );
};
