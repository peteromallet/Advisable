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
import { withNotifications } from "src/components/Notifications";
import { Mobile } from "src/components/Breakpoint";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import ButtonGroup from "src/components/ButtonGroup";
import Availability from "./Availability";
import { Header, Body, Footer } from "./styles";

import REQUEST_INTRO from "./requestIntroduction.graphql";

class RequestIntroductionModal extends React.Component {
  render() {
    const notifications = this.props.notifications;
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
                        return moment(time).isAfter(moment().add(1, 'day').startOf('day'));
                      }
                    ),
                    timeZone: moment.tz.guess() || "Europe/Dublin"
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

                    notifications.notify(
                      `An interview request has been sent to ${
                        specialist.name
                      }`
                    );
                  }}
                  render={formik => (
                    <form
                      style={{
                        height: isMobile ? "100%" : 600,
                        maxHeight: "100%"
                      }}
                      onSubmit={formik.handleSubmit}
                    >
                      <Header>
                        <Heading marginBottom="xs">
                          Request Introduction
                        </Heading>
                        <Text marginBottom="xl" block>
                          Select at least 3 times over the next 5 working days
                          when you will be available for a call with{" "}
                          {specialist.name}
                        </Text>
                        <TimeZoneSelect
                          value={formik.values.timeZone}
                          onChange={zone => {
                            formik.setFieldValue("timeZone", zone);
                          }}
                        />
                      </Header>
                      <Body>
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
                      </Body>
                      <Footer>
                        <Spacing padding="xl">
                          <ButtonGroup fullWidth={isMobile}>
                            <Button
                              primary
                              size="l"
                              type="submit"
                              loading={formik.isSubmitting}
                              disabled={formik.isSubmitting}
                            >
                              Request Call
                            </Button>
                            <Button size="l" onClick={this.props.onClose}>
                              Cancel
                            </Button>
                          </ButtonGroup>
                        </Spacing>
                      </Footer>
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

export default withNotifications(RequestIntroductionModal);
