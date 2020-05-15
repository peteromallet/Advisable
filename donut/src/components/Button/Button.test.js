import React from "react";
import { axe } from "jest-axe";
import { render } from "@testing-library/react";
import Button from "./index";

test("Is accessible", async () => {
  const { container } = render(<Button>Click Me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
