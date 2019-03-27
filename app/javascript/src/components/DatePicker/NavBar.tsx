import * as React from 'react';

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
      <button type='button' onClick={() => onPreviousClick()}>
        ←
      </button>
      <button type='button' onClick={() => onNextClick()}>
        →
      </button>
    </div>
  );
}

export default Navbar;