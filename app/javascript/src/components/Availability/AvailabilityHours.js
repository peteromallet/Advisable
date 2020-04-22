import { times } from "lodash-es";
import React from "react";
import { Hours, Hour } from "./styles";

const AvailabilityHours = () => (
  <Hours>
    {times(25, (h) => {
      const hour = h < 10 ? `0${h}:00` : `${h}:00`;
      return <Hour key={h}>{hour}</Hour>;
    })}
  </Hours>
);

export default AvailabilityHours;
