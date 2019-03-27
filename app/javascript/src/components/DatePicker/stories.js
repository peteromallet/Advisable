import React from "react";
import { storiesOf } from "@storybook/react";
import DatePicker from "./";
import Card from "../Card";
import Padding from "../Spacing/Padding";

storiesOf("DatePicker", module).add("Basic", () =>
  React.createElement(() => {
    const [date, setDate] = React.useState(null);

    return (
      <Padding size="l">
        <Card>
          <Padding size="l">
            <DatePicker onDayClick={day => setDate(day)} selectedDays={date} />
          </Padding>
        </Card>
      </Padding>
    );
  })
);
