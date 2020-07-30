import React from "react";
import { Info, Check, AlertTriangle } from "@styled-icons/feather";
import { withKnobs } from "@storybook/addon-knobs";
import Badge from "./";
import Card from "../Card";
import Box from "../Box";

export default {
  title: "Content|Badge",
  decorators: [withKnobs],
};

export const badge = () => {
  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Box mb="l">
        <Badge mr="s" variant="neutral">
          Submitted
        </Badge>
        <Badge mr="s" variant="cyan">
          Paid
        </Badge>
        <Badge mr="s" variant="orange">
          Pending
        </Badge>
      </Box>
      <Box mb="l">
        <Badge mr="s" prefix={<Info />} variant="neutral">
          Submitted
        </Badge>
        <Badge mr="s" prefix={<Check />} variant="cyan">
          Paid
        </Badge>
        <Badge mr="s" prefix={<AlertTriangle />} variant="orange">
          Pending
        </Badge>
      </Box>
      <Box>
        <Badge mr="s" variant="neutral" size="lg">
          Large
        </Badge>
        <Badge mr="s" variant="neutral" size="md">
          Medium
        </Badge>
        <Badge mr="s" variant="neutral" size="sm">
          Small
        </Badge>
      </Box>
    </Card>
  );
};
