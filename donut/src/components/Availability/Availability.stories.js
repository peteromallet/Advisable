import React from "react";

import Availability from "./";
import Card from "../Card";

export default {
  title: 'Forms/Availability',
};

export const availabilityInput = () => {
  const timeZone = "Europe/Dublin";
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
