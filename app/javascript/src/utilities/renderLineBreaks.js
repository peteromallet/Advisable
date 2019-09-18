import React from "react";

// Takes a given string and splits it up into multiple react fragments
// when ever there is a line break.
const renderLineBreaks = content => {
  return content
    .replace(/<br\s\/>/g, "\n")
    .split("\n")
    .map((item, key) => {
      return (
        <React.Fragment key={key}>
          {item}
          <br />
        </React.Fragment>
      );
    });
};

export default renderLineBreaks;
