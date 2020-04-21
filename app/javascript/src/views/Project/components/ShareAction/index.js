// Displays a button which when clicked will open a modal window to share
//the project on various networks.
import React from "react";
import { Share as ShareIcon } from "@styled-icons/feather";
import Modal from "src/components/Modal";
import { RoundedButton } from "@advisable/donut";
import Share from "../Share";

class ShareAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <Share {...this.props} />
        </Modal>
        <RoundedButton
          size="s"
          marginTop="m"
          type="button"
          variant="subtle"
          prefix={<ShareIcon />}
          onClick={() => this.setState({ open: true })}
        >
          Sharing options
        </RoundedButton>
      </React.Fragment>
    );
  }
}

export default ShareAction;
