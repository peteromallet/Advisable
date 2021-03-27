import React, { useState } from "react";
import PhoneNumberInput from "./index";

export default {
  title: "Components/PhoneNumberInput",
};

export const basic = () => {
  const [value, setValue] = useState("+353123456789");
  return <PhoneNumberInput value={value} onChange={setValue} />;
};
