import * as React from "react";
import clipboard from "clipboard-polyfill";
import { CopyURL as Wrapper } from "./styles";

const CopyURL = ({ children }) => {
  const inputRef = React.useRef(null);
  const [copied, setCopied] = React.useState(false);

  const handleClick = () => {
    inputRef.current.select();
  };

  const handleCopy = e => {
    setCopied(true);
    clipboard.writeText(children);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Wrapper>
      <input ref={inputRef} value={children} onClick={handleClick} readOnly />
      {copied && <span>Copied to clipboard</span>}
      <button type="button" onClick={handleCopy}>
        Copy
      </button>
    </Wrapper>
  );
};

export default CopyURL;