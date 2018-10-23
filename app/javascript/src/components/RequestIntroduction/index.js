import React, { Fragment } from "react";
import remove from "lodash/remove";
import { Formik } from "formik";
import moment from 'moment-timezone';
import { Mutation } from "react-apollo";
import Modal from "src/components/Modal";
import Text from "src/components/Text";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import Button from "src/components/Button";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import ButtonGroup from "src/components/ButtonGroup";
import Availability from "./Availability";

import REQUEST_INTRO from "./requestIntroduction.graphql";

class RequestIntroductionModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal size="l" isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <Mutation mutation={REQUEST_INTRO}>
          {(mutate, data) => (
            <Fragment>
              <Spacing padding="xl">
                <Heading marginBottom="xs">Request Introduction</Heading>
                <Text block>
                  Select at least 3 times over the next 5 working days when you
                  will be available for a call with {specialist.name}
                </Text>
              </Spacing>
              <Formik
                initialValues={{
                  availability: [],
                  timeZone: moment.tz.guess(),
                }}
                onSubmit={values => {
                  console.log(values);
                }}
                render={formik => (
                  <form onSubmit={formik.handleSubmit}>
                    <TimeZoneSelect
                      value={formik.values.timeZone}
                      onChange={zone => {
                        formik.setFieldValue("timeZone", zone);
                      }}
                    />
                    <Availability
                      timeZone={formik.values.timeZone}
                      selected={formik.values.availability}
                      onSelect={times => {
                        formik.setFieldValue("availability", times);
                      }}
                    />
                    <Spacing padding="xl">
                      <ButtonGroup>
                        <Button
                          primary
                          size="l"
                          type="submit"
                          loading={data.loading}
                        >
                          Request
                        </Button>
                        <Button size="l" onClick={this.props.onClose}>
                          Cancel
                        </Button>
                      </ButtonGroup>
                    </Spacing>
                  </form>
                )}
              />
            </Fragment>
          )}
        </Mutation>
      </Modal>
    );
  }
}

export default RequestIntroductionModal;
