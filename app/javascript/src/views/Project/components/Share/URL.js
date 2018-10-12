import React from "react";
import { URL } from "./styles";

class URLComponent extends React.Component {
  state = {
    copied: false
  }

  handleTextClick = () => {
    this.url.select();
  };

  handleCopy = e => {
    this.url.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    this.setState({ copied: true });

    setTimeout(() => {
      this.setState({ copied: false })
    }, 2000);
  };

  render() {
    return (
      <URL>
        <input
          ref={c => (this.url = c)}
          value={this.props.children}
          onClick={this.handleTextClick}
          readOnly
        />
        {this.state.copied && (
          <span className='copiedToClipboard'>Copied to clipboard</span>
        )}
        <button type="button" onClick={this.handleCopy}>
          Copy
        </button>
      </URL>
    );
  }
}

export default URLComponent;
