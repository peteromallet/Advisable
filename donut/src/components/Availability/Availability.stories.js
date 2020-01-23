import React from "react";

import Availability from "./";
import Card from "../Card";

export default {
  title: "Availability",
};

export const availabilityInput = () => {
  const [availability, setAvailability] = React.useState([]);

  return (
    <Card py="xxl">
      <Availability value={availability} onChange={setAvailability} />
    </Card>
  );
};
