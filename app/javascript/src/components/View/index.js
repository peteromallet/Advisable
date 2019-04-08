// The View component provides a base layout for a page. It takes care of
// rendering the application header and simply renders its children below.
import React from "react";
import Header from "src/components/Header";

export default ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}