import React from 'react';
import { ShareButton } from './styles';

class CopyButton extends React.Component {
  state = {
    copied: false
  }

  handleClick = e => {
    const el = document.createElement('textarea');
    el.value = this.props.url;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

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
