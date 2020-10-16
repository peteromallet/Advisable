import { Settings } from "luxon";
import { render, screen, fireEvent } from "@testing-library/react";
import AvailabilityInput from "./";

// Its always 27th may 2020 at midday
Settings.now = () => new Date(2020, 4, 27, 12, 0, 0, 0).valueOf();

const changeHandler = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test("can select times", () => {
  render(
    <AvailabilityInput
      value={[]}
      onChange={changeHandler}
      timezone="Europe/Berlin"
    />,
  );

  const time = screen.getByLabelText("2 Jun 2020, 10:00");
  fireEvent.mouseDown(time);
  fireEvent.mouseUp(time);
  expect(changeHandler).toHaveBeenCalledWith(["2020-06-02T10:00:00.000+02:00"]);
});

test("can select multiple times", () => {
  render(
    <AvailabilityInput
      value={[]}
      onChange={changeHandler}
      timezone="Europe/Berlin"
    />,
  );

  fireEvent.mouseDown(screen.getByLabelText("2 Jun 2020, 10:00"));
  fireEvent.mouseOver(screen.getByLabelText("3 Jun 2020, 10:30"));
  fireEvent.mouseUp(screen.getByLabelText("3 Jun 2020, 10:30"));
  expect(changeHandler).toHaveBeenCalledWith([
    "2020-06-02T10:00:00.000+02:00",
    "2020-06-02T10:30:00.000+02:00",
    "2020-06-03T10:00:00.000+02:00",
    "2020-06-03T10:30:00.000+02:00",
  ]);
});

test("can remove times", () => {
  let value = [
    "2020-06-02T10:00:00.000+02:00",
    "2020-06-02T10:30:00.000+02:00",
    "2020-06-03T10:00:00.000+02:00",
    "2020-06-03T10:30:00.000+02:00",
  ];

  const handleChange = (newValue) => {
    value = newValue;
  };

  render(
    <AvailabilityInput
      value={value}
      onChange={handleChange}
      timezone="Europe/Berlin"
    />,
  );

  expect(value).toContain("2020-06-02T10:00:00.000+02:00");
  expect(value).toContain("2020-06-03T10:00:00.000+02:00");
  fireEvent.mouseDown(screen.getByLabelText("3 Jun 2020, 10:00"));
  fireEvent.mouseOver(screen.getByLabelText("2 Jun 2020, 10:00"));
  fireEvent.mouseUp(screen.getByLabelText("2 Jun 2020, 10:00"));
  expect(value).not.toContain("2020-06-02T10:00:00.000+02:00");
  expect(value).not.toContain("2020-06-03T10:00:00.000+02:00");
});

test("selected times are marked as selected", () => {
  let value = ["2020-06-02T10:00:00.000+02:00"];

  render(
    <AvailabilityInput
      value={value}
      onChange={() => {}}
      timezone="Europe/Berlin"
    />,
  );

  const time = screen.getByLabelText("2 Jun 2020, 10:00");
  expect(time).toHaveAttribute("aria-selected", "true");
});

test("can move forward and back in weeks", () => {
  render(
    <AvailabilityInput
      value={[]}
      onChange={changeHandler}
      timezone="Europe/Berlin"
    />,
  );

  const nextWeek = screen.getByLabelText("Next week");
  const previousWeek = screen.getByLabelText("Previous week");
  fireEvent.click(nextWeek);
  screen.getByText(/6 jun/i);
  fireEvent.click(previousWeek);
  screen.getByText(/28 may/i);
  expect(previousWeek).toBeDisabled();
});

test("Passed values are converted to timezone", () => {
  render(
    <AvailabilityInput
      onChange={changeHandler}
      timezone="America/New_York"
      value={["2020-06-02T10:00:00.000+02:00"]}
    />,
  );

  screen.getByText(/28 may/i);
  const time = screen.getByLabelText("2 Jun 2020, 04:00");
  expect(time).toHaveAttribute("aria-selected", "true");
});

test("can not select weekends", () => {
  render(
    <AvailabilityInput
      value={[]}
      onChange={changeHandler}
      timezone="Europe/Berlin"
    />,
  );

  // Start drag on weekend
  fireEvent.mouseDown(screen.getByLabelText("30 May 2020, 10:00"));
  fireEvent.mouseOver(screen.getByLabelText("3 Jun 2020, 10:30"));
  fireEvent.mouseUp(screen.getByLabelText("3 Jun 2020, 10:30"));
  expect(changeHandler).not.toHaveBeenCalled();

  // try end drag on weekend
  fireEvent.mouseDown(screen.getByLabelText("1 Jun 2020, 10:00"));
  fireEvent.mouseOver(screen.getByLabelText("30 May 2020, 10:30"));
  fireEvent.mouseUp(screen.getByLabelText("30 May 2020, 10:30"));
  expect(changeHandler).toHaveBeenCalledWith([
    "2020-06-01T10:00:00.000+02:00",
    "2020-06-01T10:30:00.000+02:00",
  ]);
});

test("can drag select through a weekend", () => {
  render(
    <AvailabilityInput
      value={[]}
      onChange={changeHandler}
      timezone="Europe/Berlin"
    />,
  );

  fireEvent.mouseDown(screen.getByLabelText("29 May 2020, 10:00"));
  fireEvent.mouseOver(screen.getByLabelText("1 Jun 2020, 10:30"));
  fireEvent.mouseUp(screen.getByLabelText("1 Jun 2020, 10:30"));
  expect(changeHandler).toHaveBeenCalledWith([
    "2020-05-29T10:00:00.000+02:00",
    "2020-05-29T10:30:00.000+02:00",
    "2020-06-01T10:00:00.000+02:00",
    "2020-06-01T10:30:00.000+02:00",
  ]);
});

test("Events are disabled", () => {
  render(
    <AvailabilityInput
      onChange={changeHandler}
      timezone="Europe/Berlin"
      value={[]}
      events={[
        {
          time: "2020-06-02T12:00:00.000+02:00",
          label: "Interview with John",
        },
      ]}
    />,
  );

  const time = screen.getByLabelText("2 Jun 2020, 12:00");
  expect(time).toHaveAttribute("disabled");
});
