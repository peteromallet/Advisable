import React from "react";
import { DateTime } from "luxon";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Availability from "./";

afterEach(cleanup);

test("User can add availability for a single day", async () => {
  console.log("started");
  let value = [];
  const handleChange = availability => (value = availability);
  const comp = render(<Availability value={value} onChange={handleChange} />);

  // We cant select availability for weekends so we need to make sure this
  // test is running for the next available weekday.
  let date = DateTime.local().plus({ days: 1 });
  while (["Sat", "Sun"].indexOf(date.toFormat("EEE") > -1)) {
    console.log(date.toFormat("dd MMMM YYYY"));
    date = date.plus({ days: 1 });
  }

  const dayElement = comp.getByLabelText(
    `Set availability for ${date.toFormat("EEEE, dd MMMM YYYY")}`
  );
});
