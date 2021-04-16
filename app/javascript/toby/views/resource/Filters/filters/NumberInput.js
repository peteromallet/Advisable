import React, { useEffect, useRef, useState } from "react";
import { Input } from "@advisable/donut";
import CurrencyInput from "./CurrencyInput";

function BasicNumberInput({ value, onChange }) {
  const timer = useRef(null);
  const [inputValue, setInputValue] = useState(value?.[0] || "");

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const saveChange = (nextValue) => {
    onChange([nextValue]);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    clearTimeout(timer.current);

    timer.current = setTimeout(() => saveChange(e.target.value), 1000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      clearTimeout(timer.current);
      saveChange(e.target.value);
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      type="number"
    />
  );
}

export default function NumberInput(props) {
  if (props.attribute.__typename === "CurrencyAttribute") {
    return <CurrencyInput {...props} />;
  }

  return <BasicNumberInput {...props} />;
}
