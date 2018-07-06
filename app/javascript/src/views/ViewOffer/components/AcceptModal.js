import React from "react";
import { Mutation } from "react-apollo";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import Modal from "src/components/Modal";
import Spacing from "src/components/Spacing";
import Button from "src/components/Button";
import Flex from "src/components/Flex";
import ACCEPT_OFFER from "../graphql/acceptOffer.graphql";

class AcceptModal extends React.Component {
  state = {
    loading: false
  };

  handleAccept = acceptOffer => async () => {
    this.setState({ loading: true });
    await acceptOffer({ variables: { id: this.props.booking.id } });
    onClose();
    this.setState({ loading: false });
  };

  render() {
    const { isOpen, booking, onClose } = this.props;
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Mutation mutation={ACCEPT_OFFER}>
          {acceptOffer => (
            <Spacing size="xl">
              <Spacing bottom="l">
                <Heading>Accept Offer</Heading>
                <Text>Are you sure you want to accept this offer?</Text>
              </Spacing>
              <Flex distribute="fillEvenly">
                <Spacing right="s">
                  <Button
                    block
                    primary
                    loading={this.state.loading}
                    onClick={this.handleAccept(acceptOffer)}>
                    Accept Offer
                  </Button>
                </Spacing>
                <Spacing left="s">
                  <Button blank block onClick={onClose}>
                    Cancel
                  </Button>
                </Spacing>
              </Flex>
            </Spacing>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default AcceptModal
