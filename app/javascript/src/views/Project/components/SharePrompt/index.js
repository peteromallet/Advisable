// SharePrompt displays a dismissible prompt to share a given project.
// If the user dismises the prompt, it will store a cookie to prevent the prompt
// showing again for that project.

import React from "react";
import Cookies from "js-cookie";
import { Card } from "@advisable/donut";
import Share from "../Share";
import { DismissButton } from "./styles";

class SharePrompt extends React.Component {
  constructor(props) {
    super(props);
    const cookie = Cookies.get(this.cookieName);
    this.state = {
      dismissed: cookie ? true : false,
    };
  }

  get cookieName() {
    return `shareDismissed-${this.props.projectID}`;
  }

  handleDismiss = () => {
    Cookies.set(this.cookieName, true, { expires: 365 });
    this.setState({ dismissed: true });
    this.props.onDismiss();
  };

  render() {
    if (this.state.dismissed) return null;
    return (
      <Card marginBottom="l" padding="m">
        <DismissButton onClick={this.handleDismiss}>Hide</DismissButton>
        <Share {...this.props} />
      </Card>
    );
  }
}

export default SharePrompt;
