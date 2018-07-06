import React from "react";
import remove from "lodash/remove";
import { Mutation } from "react-apollo";
import Modal from "src/components/Modal";
import Flex from "src/components/Flex";
import Heading from "src/components/Heading";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import Spacing from "src/components/Spacing";
import { Container, Text } from "./styles.js";

import UPDATE_STATUS from "../../graphql/updateApplicationStatus.graphql";
import FETCH_PROJECT from "../../graphql/fetchProject.graphql";

class RequestIntroductionModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <Mutation mutation={UPDATE_STATUS}>
          {(mutate, data) => (
            <Container>
              <Spacing bottom="l">
                <Avatar name={application.specialist.name} />
              </Spacing>
              <Spacing bottom="xs">
                <Heading>
                  Request Introduction
                </Heading>
              </Spacing>
              <Spacing bottom="xl">
                <Text>
                  Are you sure you want to request introduction to{" "}
                  {specialist.name}?
                </Text>
              </Spacing>
              <Flex distribute='fillEvenly'>
                <Spacing right="s">
                  <Button
                    primary
                    block
                    size='l'
                    loading={data.loading}
                    onClick={async () => {
                      await mutate({
                        variables: {
                          id: application.id,
                          status: "Application Accepted"
                        }
                      })
                      this.props.onClose();
                    }}
                  >
                    Request Intro
                  </Button>
                </Spacing>
                <Spacing left="s">
                  <Button size='l' block onClick={this.props.onClose}>Cancel</Button>
                </Spacing>
              </Flex>
            </Container>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default RequestIntroductionModal;
