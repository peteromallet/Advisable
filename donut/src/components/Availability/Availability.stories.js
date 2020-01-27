import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";

import Availability from "./";
import Card from "../Card";

export default {
  title: "Availability",
  decorators: [withKnobs],
};

export const availabilityInput = () => {
  const timeZone = text("Time Zone", "Europe/Dublin");
  const [availability, setAvailability] = React.useState([]);

  return (
    <Card py="xxl">
      <Availability
        timeZone={timeZone}
        value={availability}
        onChange={setAvailability}
      />
    </Card>
  );
};
