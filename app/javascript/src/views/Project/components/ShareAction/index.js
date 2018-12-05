// Displays a button which when clicked will open a modal window to share
//the project on various networks.
import React from "react";
import Icon from "src/components/Icon";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
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
        <Button
          size='s'
          marginTop="m"
          type="button"
          styling="outlined"
          onClick={() => this.setState({ open: true })}
        >
          <Icon icon='share' width={16} />
          Sharing options
        </Button>
      </React.Fragment>
    );
  }
}

export default ShareAction;
