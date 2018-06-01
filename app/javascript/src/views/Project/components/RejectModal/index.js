import React from "react";
import remove from "lodash/remove";
import { Query, Mutation } from "react-apollo";
import { Formik, Field } from "formik";
import Modal from "src/components/Modal";
import Flex from "src/components/Flex";
import Heading from "src/components/Heading";
import Avatar from "src/components/Avatar";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Spacing from "src/components/Spacing";

import { Container, Text, Error } from "./styles";
import FETCH_REASONS from "./reasons.graphql";
import UPDATE_STATUS from "../../graphql/updateApplicationStatus.graphql";

class RejectModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <Mutation mutation={UPDATE_STATUS}>
          {mutate => (
            <Formik
              initialValues={{
                reason: ""
              }}
              validate={values => {
                let errors = {};
                if (values.reason === "") {
                  errors.reason = "Please select a reason for rejection";
                }
                return errors;
              }}
              onSubmit={values =>
                mutate({
                  variables: {
                    id: application.id,
                    status: "Application Rejected",
                    rejectionReason: values.reason
                  },
                  optimisticResponse: {
                    __typename: "Mutation",
                    updateApplicationStatus: {
                      id: application.id,
                      __typename: "Application",
                      status: "Application Rejected"
                    }
                  }
                })
              }>
              {formik => (
                <form onSubmit={formik.handleSubmit}>
                  <Container>
                    <Spacing bottom="l">
                      <Avatar name={specialist.name} />
                    </Spacing>
                    <Spacing bottom="xs">
                      <Heading>Reject {specialist.name}</Heading>
                    </Spacing>
                    <Spacing bottom="xl">
                      <Text size="l">
                        Please provide feedback by selecting a reason for
                        rejection
                      </Text>
                    </Spacing>
                    <Spacing bottom="l">
                      <React.Fragment>
                        <Query query={FETCH_REASONS}>
                          {query => (
                            <Select
                              name="reason"
                              value={formik.values.reason}
                              onChange={formik.handleChange}
                              placeholder="Select reason for rejection"
                              options={query.data.reasons}
                            />
                          )}
                        </Query>
                        {formik.errors.reason && (
                          <Error>{formik.errors.reason}</Error>
                        )}
                      </React.Fragment>
                    </Spacing>
                    <Flex>
                      <Spacing right="s">
                        <Button
                          primary
                          block
                          size="l"
                          type="submit"
                          disabled={formik.isSubmitting}>
                          Reject
                        </Button>
                      </Spacing>
                      <Spacing left="s">
                        <Button size="l" block onClick={this.props.onClose}>
                          Cancel
                        </Button>
                      </Spacing>
                    </Flex>
                  </Container>
                </form>
              )}
            </Formik>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default RejectModal;
