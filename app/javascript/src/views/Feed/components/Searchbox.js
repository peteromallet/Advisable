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
    border-2
    border-solid
    border-neutral200
  `,
  variants: {
    focused: `border-blue600`,
  },
});

const buttonClasses = composeStyles({
  base: `bg-blue500 hover:bg-blue700 px-5 py-3 leading-none text-white rounded-full font-medium flex items-center`,
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
        className="outline-none w-full bg-transparent text-lg"
        {...props}
      />
      <button className={buttonClasses()}>
        Search
        <ArrowSmRight className="w-5 h-5 ml-2" />
      </button>
    </form>
  );
}
