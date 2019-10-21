import React from "react";
import reduce from "lodash/reduce";
import { Avatar } from "./styles";

const Component = ({ name, url, size, ...props }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = url;
  }, [url]);

  const initials = reduce(
    name.trim().split(/\s+/),
    (sum, name) => {
      return `${sum}${name[0]}`;
    },
    ""
  );

  let style = {};
  if (imageLoaded) {
    style = {
      backgroundImage: `url(${url})`,
    };
  }

  return (
    <Avatar
      style={url && style}
      size={size}
      url={imageLoaded && url}
      {...props}
    >
      {initials}
    </Avatar>
  );
};

export default Component;
