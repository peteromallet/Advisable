import React from "react";
import remove from "lodash/remove";
import { Query, Mutation } from "react-apollo";
import { Formik, Field } from "formik";
import Modal from "src/components/Modal";
import Flex from "src/components/Flex";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import Avatar from "src/components/Avatar";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Spacing from "src/components/Spacing";

import { Container, Error } from "./styles";
import REJECT from "./reject.graphql";
import FETCH_REASONS from "./reasons.graphql";

class RejectModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <Mutation mutation={REJECT}>
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
              onSubmit={async values => {
                await mutate({
                  variables: {
                    id: application.id,
                    rejectionReason: values.reason
                  }
                });
                this.props.onClose();
              }}>
              {formik => (
                <form onSubmit={formik.handleSubmit}>
                  <Container>
                    <Avatar marginBottom="l" name={specialist.name} />
                    <Heading marginBottom="xs">
                      Reject {specialist.name}
                    </Heading>
                    <Text marginBottom="l" size="l">
                      Please provide feedback by selecting a reason for
                      rejection
                    </Text>
                    <Spacing paddingBottom="xl">
                      <Query query={FETCH_REASONS}>
                        {query => (
                          <Select
                            block
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
                    </Spacing>
                    <Flex distribute="fillEvenly">
                      <Flex.Item paddingRight='s'>
                        <Button
                          primary
                          block
                          size="l"
                          type="submit"
                          loading={formik.isSubmitting}
                          disabled={formik.isSubmitting}>
                          Reject
                        </Button>
                      </Flex.Item>
                      <Flex.Item paddingLeft='s'>
                        <Button
                          size="l"
                          type="button"
                          block
                          onClick={this.props.onClose}>
                          Cancel
                        </Button>
                      </Flex.Item>
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
