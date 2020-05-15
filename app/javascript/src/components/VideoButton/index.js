import React from "react";
import { VideoButton as VideoButtonStyles, PlayIcon } from "./styles";

const VideoButton = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <VideoButtonStyles ref={ref} {...rest}>
      <PlayIcon>
        <svg
          width="6"
          height="8"
          viewBox="0 0 6 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 4L-2.68221e-07 8L-2.68221e-07 0L6 4Z" fill="#fff" />
        </svg>
      </PlayIcon>
      {children}
    </VideoButtonStyles>
  );
});

export default VideoButton;
