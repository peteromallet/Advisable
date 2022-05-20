import React from "react";

export function HeaderButtonGroup({ children }) {
  return <div className="toby-header-button-group">{children}</div>;
}

const HeaderButton = React.forwardRef(function HeaderButton(
  { icon, children, ...props },
  ref,
) {
  return (
    <button className="toby-header-button" ref={ref} {...props}>
      {React.createElement(icon, { size: 20 })}
      <span>{children}</span>
    </button>
  );
});

export default HeaderButton;
