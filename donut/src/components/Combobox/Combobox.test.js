import React from "react";
import Autocomplete from "./index";
import { act, render, fireEvent, screen, waitFor } from "@testing-library/react";
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
  const changeHandler = jest.fn();

  render(
    <Autocomplete
      value=""
      onChange={changeHandler}
      options={OPTIONS}
      placeholder="Select option"
    />,
  );

  const input = screen.getByPlaceholderText(/select option/i);
  fireEvent.change(input, { target: { value: "Mich" } });
  fireEvent.keyDown(input, { key: "ArrowDown", keyCode: 40 });
  fireEvent.keyDown(input, { key: "Return", keyCode: 13 });

  expect(changeHandler).toHaveBeenCalledWith(
    expect.objectContaining({
      label: "Michael",
      value: "4",
    }),
  );
});

test("selecting option with mouse", async () => {
  const changeHandler = jest.fn();

  render(
    <Autocomplete
      value=""
      onChange={changeHandler}
      options={OPTIONS}
      placeholder="Select option"
    />,
  );

  const input = screen.getByPlaceholderText(/select option/i);
  userEvent.type(input, "Mich")
  await screen.findByRole("option", { name: /michael/i });
  fireEvent.click(screen.getByRole("option", { name: /michael/i }));
  expect(changeHandler).toHaveBeenCalled();
});

test("can take a preselected value", async () => {
  const changeHandler = jest.fn();
  render(
    <Autocomplete
      value={{ label: "Toby", value: "5" }}
      onChange={changeHandler}
      options={OPTIONS}
      placeholder="Select option"
    />,
  );

  const input = screen.getByDisplayValue("Toby");
  expect(input).toBeInTheDocument();
});

test("Selecting multiple values", async () => {
  let values = [{ label: "Dwight", value: "2" }];

  function onChange(newValues) {
    values = newValues;
  }

  render(
    <Autocomplete
      value={values}
      multiple
      onChange={onChange}
      options={OPTIONS}
      placeholder="Select option"
    />,
  );

  const input = screen.getByPlaceholderText(/select option/i);
  fireEvent.change(input, { target: { value: "Hol" } });
  fireEvent.keyDown(input, { key: "ArrowDown", keyCode: 40 });
  fireEvent.keyDown(input, { key: "Return", keyCode: 13 });

  expect(values[0].label).toEqual("Dwight");
  expect(values[1].label).toEqual("Holly");
});

test("Creating a new record", async () => {
  const changeHandler = jest.fn();

  render(
    <Autocomplete
      creatable
      value={null}
      onChange={changeHandler}
      options={OPTIONS}
      placeholder="Select option"
    />,
  );

  const input = screen.getByPlaceholderText(/select option/i);
  fireEvent.change(input, { target: { value: "New Person" } });
  const option = screen.getByRole("option", { name: /new person/i });
  fireEvent.click(option);
  expect(changeHandler).toHaveBeenCalledWith(
    expect.objectContaining({
      label: "New Person",
      value: "New Person",
    }),
  );
});

test("Async options", async () => {
  const changeHandler = jest.fn();
  const searchOptions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: "One", value: "1" },
          { label: "Two", value: "2" },
          { label: "Three", value: "3" },
        ]);
      }, 100);
    });
  };

  render(
    <Autocomplete
      value={null}
      options={OPTIONS}
      onChange={changeHandler}
      placeholder="Select option"
      loadOptions={searchOptions}
    />,
  );

  const input = screen.getByPlaceholderText(/select option/i);
  fireEvent.change(input, { target: { value: "Two" } });
  await screen.findByText(/loading/i);
  await screen.findByRole("option", { name: /two/i });
  fireEvent.click(screen.getByRole("option", { name: /two/i }));
  expect(changeHandler).toHaveBeenCalledWith(
    expect.objectContaining({
      label: "Two",
      value: "2",
    }),
  );
});
