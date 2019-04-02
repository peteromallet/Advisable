import * as React from "react";
import { Trigger } from "./styles";

interface Props {
  onClick?: () => void;
  onFocus?: () => void;
}

export default React.forwardRef((props: Props, ref: any) => {
  return (
    <Trigger ref={ref} onFocus={props.onFocus} onClick={props.onClick}>
      <svg
        width="18"
        height="4"
        viewBox="0 0 18 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="4" height="4" rx="2" fill="currentColor" />
        <rect x="7" width="4" height="4" rx="2" fill="currentColor" />
        <rect x="14" width="4" height="4" rx="2" fill="currentColor" />
      </svg>
    </Trigger>
  );
});
