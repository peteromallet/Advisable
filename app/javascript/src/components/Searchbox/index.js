import { motion } from "framer-motion";
import { ArrowSmRight, Search } from "@styled-icons/heroicons-solid";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";

const iconClasses = composeStyles({
  base: `
    w-5
    h-5
    ml-3 
    shrink-0
    text-neutral-400
  `,
  variants: {
    focused: `!text-blue900`,
  },
});

const searchBoxClasses = composeStyles({
  base: `
    p-1
    flex
    bg-white
    border
    border-solid
    border-neutral-300
    shadow
    items-center
    gap-2
    rounded-full
    cursor-text

    hover:border-neutral-400
  `,
  variants: {
    focused: `
      ring-1
      ring-solid
      ring-blue-700
      !border-blue-700
    `,
  },
});

const buttonClasses = composeStyles({
  base: `
    w-8
    h-8
    grid
    shrink-0
    rounded-full
    place-items-center
    
    invisible
    opacity-0
    transition-all

    bg-blue500
    bg-gradient-to-br
    from-blue500
    to-purple500
    hover:from-blue600
    hover:to-purple600
    active:from-blue700
    active:to-purple700
  `,
  variants: {
    focused: `!visible opacity-100`,
  },
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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      inputRef.current.blur();
      window.scrollTo(0, 0);
      navigate(`/explore/search?q=${value}`);
    }
  };

  return (
    <motion.form
      onClick={handleClick}
      onSubmit={handleSubmit}
      className={searchBoxClasses({ className, focused })}
      initial={{ width: focused ? "100%" : "70%" }}
      animate={{ width: focused ? "100%" : "70%" }}
      // transition={{ duration: 0.3 }}
    >
      <Search className={iconClasses({ focused })} />
      <input
        ref={inputRef}
        value={value}
        autoComplete="off"
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search projects..."
        className="outline-none w-full bg-transparent placeholder:text-neutral-400"
        {...props}
      />
      <button className={buttonClasses({ focused })}>
        <ArrowSmRight className="w-4 h-4 text-white" />
      </button>
    </motion.form>
  );
}
