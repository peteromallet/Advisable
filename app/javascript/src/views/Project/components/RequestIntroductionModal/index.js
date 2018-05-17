import React from "react";
import remove from "lodash/remove";
import { Mutation } from "react-apollo";
import Text from 'src/components/Text';
import Modal from "src/components/Modal";
import Avatar from 'src/components/Avatar';
import Button from 'src/components/Button';
import Spacing from 'src/components/Spacing';
import { Container } from './styles.js';

import UPDATE_STATUS from "../../graphql/updateApplicationStatus.graphql";
import FETCH_PROJECT from "../../graphql/fetchProject.graphql";

class RequestIntroductionModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <Mutation mutation={UPDATE_STATUS}>
          {mutate => (
            <Container>
              <Spacing bottom='m'>
                <Avatar name={application.specialist.name} />
              </Spacing>
              <Spacing bottom='m'>
                <Text>Are you sure you want to request introduction to {specialist.name}?</Text>
              </Spacing>
              <Spacing right='xs' inline>
                <Button
                  primary
                  onClick={() => {
                    this.props.onClose();
                    mutate({
                      variables: {
                        id: application.id,
                        status: "Application Accepted"
                      },
                      optimisticResponse: {
                        __typename: "Mutation",
                        updateApplicationStatus: {
                          id: application.id,
                          __typename: "Application",
                          status: "Application Accepted"
                        }
                      },
                      update: (store, { data: { updateApplicationStatus } }) => {
                        const variables = {
                          id: "reciRKA92VmIGuruG",
                          status: "Applied"
                        };

                        const data = store.readQuery({
                          query: FETCH_PROJECT,
                          variables
                        });

                        remove(data.project.applications, {
                          id: application.id
                        });

                        store.writeQuery({
                          query: FETCH_PROJECT,
                          variables,
                          data
                        });
                      }
                    });
                  }}
                >
                  Yes
                </Button>
              </Spacing>
              <Spacing left='xs' inline>
                <Button onClick={this.props.onClose}>Cancel</Button>
              </Spacing>
            </Container>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default RequestIntroductionModal;
