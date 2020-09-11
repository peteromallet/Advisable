import React from "react";
import { Calendar } from "@styled-icons/feather";
import { withKnobs, text } from "@storybook/addon-knobs";
import Circle from "./";
import Card from "../Card";

export default {
  title: 'Utilities/Circle',
  decorators: [withKnobs],
};

export const circle = () => {
  const bg = text("bg", "blue100");
  const color = text("color", "blue700");
  const size = text("size", "58px");

  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Circle size={size} bg={bg} color={color}>
        <Calendar size="24px" strokeWidth={2} />
      </Circle>
    </Card>
  );
};
