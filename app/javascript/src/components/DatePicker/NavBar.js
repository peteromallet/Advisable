import React from 'react';

const Navbar = ({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) => {
  return (
    <div className={className}>
      <button onClick={() => onPreviousClick()}>
        ←
      </button>
      <button onClick={() => onNextClick()}>
        →
      </button>
    </div>
  );
}

export default Navbar;
