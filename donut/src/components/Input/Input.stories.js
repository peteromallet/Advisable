import React from "react";
import Input from "./";
import Card from "../Card";
import InputDecorations from "./InputDecorations";

export default {
  title: "Input",
};

export const basicInput = () => {
  return (
    <Card padding="xl" maxWidth={500} mx="auto">
      <Input placeholder="Type something" />
    </Card>
  );
};

export const prefix = () => {
  return (
    <Card padding="xl" maxWidth={500} mx="auto">
      <InputDecorations prefix="$">
        <Input placeholder="https://" />
      </InputDecorations>
    </Card>
  );
};

export const suffix = () => {
  return (
    <Card padding="xl" maxWidth={500} mx="auto">
      <InputDecorations suffix="Suffix">
        <Input placeholder="https://" />
      </InputDecorations>
    </Card>
  );
};
