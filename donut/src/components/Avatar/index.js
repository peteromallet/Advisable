import { reduce } from "lodash-es";
import React, { useState, useEffect } from "react";
import {
  StyledAvatar,
  StyledAvatarImage,
  StyledAvatarInitials,
} from "./styles";

const Avatar = ({ url, name, children, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = url;
  }, [url]);

  const initials = reduce(
    name.trim().split(/\s+/),
    (sum, name) => `${sum}${name[0]}`,
    "",
  );

  return (
    <StyledAvatar url={loaded && url} {...props}>
      {initials && <StyledAvatarInitials>{initials}</StyledAvatarInitials>}
      {children}
      <StyledAvatarImage url={loaded && url} />
    </StyledAvatar>
  );
};

Avatar.defaultProps = {
  size: "m",
};

export default Avatar;
