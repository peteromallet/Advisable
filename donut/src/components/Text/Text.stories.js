import React from "react";
import { Info, Check, AlertTriangle } from "@styled-icons/feather";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import Text from "./";
import Card from "../Card";
import Box from "../Box";

export default {
  title: 'Content/Text',
  decorators: [withKnobs],
};

const sampleText =
  "Get Instant Access to World-Class Marketing Freelancers. Across 600+ different marketing skills, get instant recommendations of talent you can trust, backed by a no questions asked money-back guarantee.";

export const basic = () => {
  const children = text("children", "This is some text.");
  const size = select(
    "fontSize",
    ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxl", "xxxl"],
    "m",
  );
  const weight = select(
    "fontWeight",
    ["regular", "medium", "semibold", "bold"],
    "regular",
  );
  return (
    <Card maxWidth="700px" mx="auto" my="60px" padding="48px">
      <Text color="blue900" fontWeight={weight} fontSize={size}>
        {children}
      </Text>
    </Card>
  );
};

export const paragraphs = () => {
  return (
    <Card maxWidth="700px" mx="auto" my="60px" padding="48px">
      <Text fontWeight="medium" mb="xxs">
        Extra Small
      </Text>
      <Text lineHeight="s" fontSize="xs" color="neutral700" mb="xl">
        {sampleText}
      </Text>
      <Text fontWeight="medium" mb="xxs">
        Small
      </Text>
      <Text lineHeight="m" fontSize="s" color="neutral700" mb="xl">
        {sampleText}
      </Text>
      <Text fontWeight="medium" mb="xxs">
        Medium
      </Text>
      <Text lineHeight="m" fontSize="m" color="neutral700" mb="xl">
        {sampleText}
      </Text>
      <Text fontWeight="medium" mb="xxs">
        Large
      </Text>
      <Text lineHeight="l" fontSize="l" color="neutral700">
        {sampleText}
      </Text>
    </Card>
  );
};
