import React from 'react';
import clipboard from "clipboard-polyfill"
import { ShareButton } from './styles';

class CopyButton extends React.Component {
  state = {
    copied: false
  }

  handleClick = e => {
    clipboard.writeText(this.props.url);

    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 2000)
  }

  render() {
    return (
      <ShareButton onClick={this.handleClick}>
        {this.state.copied ? 'Copied!' : 'Copy Link'}
      </ShareButton>
    )
  }
}

export default CopyButton
