import React, { useState } from "react";
import PhoneNumberInput from "./index";

export default {
  title: "Components/PhoneNumberInput",
};

export function Basic() {
  const [value, setValue] = useState("");
  return <PhoneNumberInput value={value} onChange={setValue} />;
}

export function DefaultValue() {
  const [value, setValue] = useState("+353123456789");
  return <PhoneNumberInput value={value} onChange={setValue} />;
}
