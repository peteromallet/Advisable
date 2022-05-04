import { ArrowSmRight, Search } from "@styled-icons/heroicons-solid";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";

const searchBoxClasses = composeStyles({
  base: `
    flex
    bg-white
    items-center
    gap-3
    rounded-full
    p-2
    pl-5
    border-[3px]
    border-solid
    border-white
    shadow-xl
  `,
  variants: {
    focused: `!border-blue200`,
  },
});

const buttonClasses = composeStyles({
  base: `
    px-5
    py-3
    leading-none
    text-white
    rounded-full
    font-medium
    flex
    items-center
    gap-2

    bg-blue500
    bg-gradient-to-br
    from-blue500
    to-purple500
    hover:from-blue600
    hover:to-purple600
    active:from-blue700
    active:to-purple700
  `,
});

export default function Searchbox({ className, ...props }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      navigate(`/explore/search?q=${value}`);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      onClick={handleClick}
      onSubmit={handleSubmit}
      className={searchBoxClasses({ className, focused })}
    >
      <Search className="w-5 h-5 shrink-0 text-blue700" />
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search projects..."
        className="outline-none w-full bg-transparent text-lg font-medium placeholder:font-normal placeholder:text-neutral500"
        {...props}
      />
      <button className={buttonClasses()}>
        <span className="hidden md:block">Search</span>
        <ArrowSmRight className="w-5 h-5" />
      </button>
    </form>
  );
}
