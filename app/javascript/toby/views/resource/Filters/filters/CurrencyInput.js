import React, { useEffect, useRef, useState } from "react";
import { Input } from "@advisable/donut";

function CurrencyInput({ value, onChange }) {
  const timer = useRef(null);
  const [inputValue, setInputValue] = useState(value?.[0] || "");
  const price = inputValue ? Number(inputValue / 100.0) : "";

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const saveChange = (nextValue) => {
    onChange([nextValue]);
  };

  function parseCurrencyValue(inputVal) {
    const stripped = inputVal.replace(/[^0-9.-]+/g, "");
    const val = stripped ? Number(stripped) * 100 : undefined;
    return val?.toString();
  }

  const handleChange = (e) => {
    const nextValue = parseCurrencyValue(e.target.value);
    setInputValue(nextValue);
    clearTimeout(timer.current);

    timer.current = setTimeout(() => saveChange(nextValue), 1000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      clearTimeout(timer.current);
      saveChange(parseCurrencyValue(e.target.value));
    }
  };

  return (
    <Input
      prefix="$"
      value={price}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default CurrencyInput;
