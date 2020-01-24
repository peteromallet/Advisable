import React from "react";
import Availability from "./";
import Card from "../Card";

export default {
  title: "Availability",
};

export const availabilityInput = () => {
  const [availability, setAvailability] = React.useState([
    "2020-01-17T09:00:00Z",
    "2020-01-17T09:30:00Z",
    "2020-01-17T10:00:00Z",
    "2020-01-17T10:30:00Z",
    "2020-01-17T11:00:00Z",
    "2020-01-17T11:30:00Z",
    "2020-01-17T14:00:00Z",
    "2020-01-17T14:30:00Z",
    "2020-01-17T15:00:00Z",
    "2020-01-17T15:30:00Z",
  ]);

  return (
    <Card py="xxl">
      <Availability value={availability} onChange={setAvailability} />
    </Card>
  );
};
