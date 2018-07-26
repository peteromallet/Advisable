import React from "react";
import remove from "lodash/remove";
import { Mutation } from "react-apollo";
import Modal from "src/components/Modal";
import Flex from "src/components/Flex";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import { Container } from "./styles.js";

import REQUEST_INTRO from "./requestIntroduction.graphql";

class RequestIntroductionModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <Mutation mutation={REQUEST_INTRO}>
          {(mutate, data) => (
            <Container>
              <Avatar marginBottom="l" name={application.specialist.name} />
              <Heading marginBottom="xs">Request Introduction</Heading>
              <Text marginBottom="xl" block>
                Are you sure you want to request introduction to{" "}
                {specialist.name}?
              </Text>
              <Flex distribute="fillEvenly">
                <Flex.Item paddingRight='s'>
                  <Button
                    primary
                    block
                    size="l"
                    loading={data.loading}
                    onClick={async () => {
                      await mutate({
                        variables: {
                          id: application.id
                        }
                      });
                      this.props.onClose();
                    }}>
                    Request Intro
                  </Button>
                </Flex.Item>
                <Flex.Item paddingLeft='s'>
                  <Button
                    size="l"
                    block
                    onClick={this.props.onClose}>
                    Cancel
                  </Button>
                </Flex.Item>
              </Flex>
            </Container>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default RequestIntroductionModal;
