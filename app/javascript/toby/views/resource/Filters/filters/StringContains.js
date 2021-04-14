import React, { useEffect, useRef, useState } from "react";
import { Input } from "@advisable/donut";

export default function StringContains({ value, onChange }) {
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
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      type="text"
    />
  );
}
