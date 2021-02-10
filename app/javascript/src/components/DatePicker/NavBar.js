import * as React from "react";

const Navbar = ({ onPreviousClick, onNextClick, className }) => {
  return (
    <div className={className}>
      <button
        aria-label="Previous Month"
        type="button"
        onClick={() => onPreviousClick()}
      >
        ←
      </button>
      <button
        aria-label="Next Month"
        type="button"
        onClick={() => onNextClick()}
      >
        →
      </button>
    </div>
  );
};

export default Navbar;
