import React from "react";
import Autocomplete from "./index";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const OPTIONS = [
  { value: "1", label: "Jim" },
  { value: "2", label: "Dwight" },
  { value: "3", label: "Pam" },
  { value: "4", label: "Michael" },
  { value: "5", label: "Toby" },
  { value: "6", label: "Holly" },
];

test("selecting an option", async () => {
  let value = "";

  function onChange(newValue) {
    value = newValue;
  }

  render(
    <Autocomplete
      value={value}
      onChange={onChange}
      options={OPTIONS}
      placeholder="Select option"
    />,
  );

  const input = screen.getByPlaceholderText(/select option/i);
  userEvent.type(input, "Ji");
  fireEvent.keyDown(input, { key: "ArrowDown", keyCode: 40 });
  userEvent.type(input, "{enter}");
  expect(value).toBe("1");
});

test("selecting option with mouse", async () => {
  let value = "";

  function onChange(newValue) {
    value = newValue;
  }

  render(
    <Autocomplete
      value={value}
      onChange={onChange}
      options={OPTIONS}
      placeholder="Select option"
    />,
  );

  const input = screen.getByPlaceholderText(/select option/i);
  userEvent.type(input, "Mich");
  const option = screen.getByText(/michael/i);
  userEvent.click(option);
  expect(value).toBe("4");
});
