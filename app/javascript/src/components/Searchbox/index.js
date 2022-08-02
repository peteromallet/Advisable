import queryString from "query-string";
import { motion } from "framer-motion";
import { ArrowSmRight, Search } from "@styled-icons/heroicons-solid";
import React, { useMemo, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";

const iconClasses = composeStyles({
  base: `
    w-4
    h-4
    ml-3 
    shrink-0
    text-neutral-700
  `,
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
  const location = useLocation();
  const [focused, setFocused] = useState(false);

  const query = useMemo(() => {
    const { search } = location?.state?.backgroundLocation || location;
    return queryString.parse(search);
  }, [location]);

  const [value, setValue] = useState(query.q || "");

  useEffect(() => {
    setValue(query.q || "");
  }, [query]);

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
      navigate(`/search?q=${value}`);
    }
  };

  return (
    <motion.form
      onClick={handleClick}
      onSubmit={handleSubmit}
      className={searchBoxClasses({ className, focused })}
      initial={{ width: focused ? "100%" : "70%" }}
      animate={{ width: focused ? "100%" : "70%" }}
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
        className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-lg"
        {...props}
      />
      <button className={buttonClasses({ focused })}>
        <ArrowSmRight className="w-4 h-4 text-white" />
      </button>
    </motion.form>
  );
}
