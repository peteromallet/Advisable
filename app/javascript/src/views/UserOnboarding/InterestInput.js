import { PlusSm } from "@styled-icons/heroicons-solid";
import React, { useState, useRef } from "react";
import composeStyles from "src/utilities/composeStyles";

const containerClasses = composeStyles({
  base: `p-3 border-2 border-solid border-neutral300 flex items-center gap-2 rounded-full`,
  variants: {
    focused: `!border-blue900`,
  },
});

export default function InterestInput({ onAdd, className }) {
  const inputRef = useRef();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={containerClasses({ className, focused })}
    >
      <div className="w-8 h-8 bg-blue900 text-white grid place-items-center rounded-full flex-shrink-0">
        <PlusSm className="w-5 h-5" />
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full outline-none"
        placeholder="Add anything you like..."
      />
    </div>
  );
}
