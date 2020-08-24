import React from "react";
import { Info, Check, AlertTriangle } from "@styled-icons/feather";
import { withKnobs } from "@storybook/addon-knobs";
import Checkbox from "./";
import Card from "../Card";

export default {
  title: 'Forms/Checkbox',
  decorators: [withKnobs],
};

export const checkbox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
        Check this to enable it
      </Checkbox>
    </Card>
  );
};
