import { Search } from "@styled-icons/heroicons-solid";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";

const searchBoxClasses = composeStyles({
  base: `flex bg-neutral100 items-center gap-2 rounded-full`,
  variants: {
    focused: `bg-neutral200`,
    size: {
      md: `py-2 px-4`,
      lg: `py-4 px-6`,
    },
  },
});

export default function Searchbox({ className, size = "md", ...props }) {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      window.scrollTo(0, 0);
      navigate(`/explore/search?q=${value}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={searchBoxClasses({ className, size, focused })}
    >
      <Search className="w-5 h-5 shrink-0 text-neutral600" />
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search projects..."
        className="outline-none w-full bg-transparent"
        {...props}
      />
    </div>
  );
}
