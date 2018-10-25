import React, { Fragment } from "react";
import filter from "lodash/filter";
import remove from "lodash/remove";
import { Formik } from "formik";
import moment from "moment-timezone";
import { Mutation } from "react-apollo";
import Modal from "src/components/Modal";
import Text from "src/components/Text";
import Flex from "src/components/Flex";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import ButtonGroup from "src/components/ButtonGroup";
import Availability from "./Availability";

import REQUEST_INTRO from "./requestIntroduction.graphql";

class RequestIntroductionModal extends React.Component {
  render() {
    const application = this.props.application;
    const specialist = application.specialist;

    return (
      <Modal
        size="l"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        expandOnMobile
      >
        <Mobile>
          {isMobile => (
            <Mutation mutation={REQUEST_INTRO}>
              {requestIntroduction => (
                <Formik
                  initialValues={{
                    availability: filter(
                      JSON.parse(localStorage.getItem("availability")) || [],
                      time => {
                        return moment(time).isAfter(moment());
                      }
                    ),
                    timeZone: moment.tz.guess()
                  }}
                  onSubmit={async values => {
                    await requestIntroduction({
                      variables: {
                        input: {
                          applicationId: application.airtableId,
                          ...values
                        }
                      }
                    });
                  }}
                  render={formik => (
                    <form
                      style={{ height: isMobile ? '100%' : 600, maxHeight: "100%" }}
                      onSubmit={formik.handleSubmit}
                    >
                      <Flex vertical>
                        <Flex.Item>
                          <Spacing padding={isMobile ? "l" : "xl"}>
                            <Heading marginBottom="xs">
                              Request Introduction
                            </Heading>
                            <Text block>
                              Select at least 3 times over the next 5 working
                              days when you will be available for a call with{" "}
                              {specialist.name}
                            </Text>
                          </Spacing>
                          <TimeZoneSelect
                            value={formik.values.timeZone}
                            onChange={zone => {
                              formik.setFieldValue("timeZone", zone);
                            }}
                          />
                        </Flex.Item>
                        <Flex.Item distribute="fill">
                          <Availability
                            timeZone={formik.values.timeZone}
                            selected={formik.values.availability}
                            onSelect={times => {
                              localStorage.setItem(
                                "availability",
                                JSON.stringify(times)
                              );
                              formik.setFieldValue("availability", times);
                            }}
                          />
                        </Flex.Item>
                        <Flex.Item>
                          <Spacing padding={isMobile ? 'l' : 'xl'}>
                            <ButtonGroup fullWidth={isMobile}>
                              <Button
                                primary
                                size="l"
                                type="submit"
                                loading={formik.isSubmitting}
                                disabled={formik.isSubmitting}
                              >
                                Request
                              </Button>
                              <Button size="l" onClick={this.props.onClose}>
                                Cancel
                              </Button>
                            </ButtonGroup>
                          </Spacing>
                        </Flex.Item>
                      </Flex>
                    </form>
                  )}
                />
              )}
            </Mutation>
          )}
        </Mobile>
      </Modal>
    );
  }
}

export default RequestIntroductionModal;
