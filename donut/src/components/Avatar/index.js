import reduce from "lodash/reduce";
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

  if (!name && !url && !children) return null;

  const initials = reduce(
    name?.trim().split(/\s+/),
    (sum, name) => `${sum}${name[0]}`,
    "",
  );

  return (
    <StyledAvatar url={loaded && url} aria-label={name} {...props}>
      {initials && <StyledAvatarInitials>{initials}</StyledAvatarInitials>}
      {children}
      <StyledAvatarImage url={loaded && url} />
    </StyledAvatar>
  );
};

Avatar.defaultProps = {
  size: "m",
  color: "neutral400",
  bg: "blue50",
};

export default Avatar;
