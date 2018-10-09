import React from "react";

const FormattedText = ({ children }) => {
  return children
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

export default FormattedText;
