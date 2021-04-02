import React from "react";
import DatePicker from "src/components/DatePicker";

export default function DateBefore({ value, onChange }) {
  const handleChange = (date) => {
    onChange([date]);
  };
  return (
    <DatePicker.Input value={value[0]} onChange={handleChange} type="number" />
  );
}
