import React from "react";
import Linkify from "linkify-react";
import { Text as TextStyles } from "./styles";

const Text = React.forwardRef(function Text(
  { children, autoLink, size, weight, truncate, ...rest },
  ref,
) {
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
      ref={ref}
      fontSize={size}
      fontWeight={weight}
      $truncate={truncate}
      {...rest}
    >
      {autoLink ? <Linkify {...linkProps}>{children}</Linkify> : children}
    </TextStyles>
  );
});

Text.defaultProps = {
  fontWeight: "regular",
};

Text.Styles = TextStyles;
Text.Styled = TextStyles;

export default Text;
