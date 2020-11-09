import React from "react";
import Linkify from "linkifyjs/react";
import { Text as TextStyles } from "./styles";

const Text = ({ children, autoLink, size, weight, truncate, ...rest }) => {
  const linkProps = {
    options: {
      attributes: {
        rel: "nofollow",
        className: "linkified",
      },
    },
  };

  return (
    <TextStyles
      fontSize={size}
      fontWeight={weight}
      $truncate={truncate}
      {...rest}
    >
      {autoLink ? <Linkify {...linkProps}>{children}</Linkify> : children}
    </TextStyles>
  );
};

Text.defaultProps = {
  fontWeight: "regular",
};

Text.Styles = TextStyles;
Text.Styled = TextStyles;

export default Text;
