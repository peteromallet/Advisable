import React from "react";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import Skeleton from "./";
import Card from "../Card";

export default {
  title: 'Content/Skeleton',
  decorators: [withKnobs],
};

export const skeleton = () => {
  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Skeleton height={24} width="60%" mb="16px" />
      <Skeleton height={14} mb="8px" />
      <Skeleton height={14} mb="8px" />
      <Skeleton height={14} width="80%" mb="8px" />
    </Card>
  );
};
