import React from "react";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import PhoneNumberInput from "./index";

function TestCase({ initial }) {
  const [phone, setPhone] = React.useState(initial || "");
  return (
    <>
      <div data-testid="result">{phone}</div>
      <PhoneNumberInput value={phone} onChange={setPhone} />
    </>
  );
}

test("Defaults to united states", () => {
  render(<TestCase />);

  const input = screen.getByRole("textbox");
  const result = screen.getByTestId("result");
  user.type(input, "123456789");
  expect(result.textContent).toBe("+1123456789");
});

test("Infers country code from phone number", () => {
  render(<TestCase initial="+353123456789" />);

  const country = screen.getByRole("combobox");
  expect(country.value).toBe("IE");
});

test("User can change country code", () => {
  render(<TestCase initial="+1123456789" />);

  const result = screen.getByTestId("result");
  const country = screen.getByRole("combobox");
  user.selectOptions(country, ["IE"]);
  expect(result.textContent).toBe("+353123456789");
});
