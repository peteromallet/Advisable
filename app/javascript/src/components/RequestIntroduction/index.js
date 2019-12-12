import React from "react";
import filter from "lodash/filter";
import { Formik } from "formik";
import moment from "moment-timezone";
import { Query, Mutation } from "react-apollo";
import Modal from "src/components/Modal";
import Text from "src/components/Text";
import Loading from "src/components/Loading";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import Button from "src/components/Button";
import { withNotifications } from "src/components/Notifications";
import { Mobile } from "src/components/Breakpoint";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import Availability from "src/components/Availability";
import { Form, Header, Body, Footer } from "./styles";
import validationSchema from "./validationSchema";

import REQUEST_INTRO from "./requestIntroduction.graphql";
import FETCH_AVAILABILITY from "./fetchAvailability.graphql";

class RequestIntroductionModal extends React.Component {
  state = {
    submitted: false,
  };

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
            <Query
              query={FETCH_AVAILABILITY}
              variables={{ id: application.airtableId }}
            >
              {query => {
                if (query.loading) return <Loading />;

                const initialValues = {
                  availability:
                    query.data.application.project.user.availability,
                  timeZone: moment.tz.guess() || "Europe/Dublin",
                };

                return (
                  <Mutation mutation={REQUEST_INTRO}>
                    {requestIntroduction => (
                      <Formik
                        validateOnMount
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async values => {
                          await requestIntroduction({
                            variables: {
                              input: {
                                applicationId: application.airtableId,
                                ...values,
                              },
                            },
                          });

                          notifications.notify(
                            `An interview request has been sent to ${specialist.name}`
                          );

                          this.props.onClose();
                        }}
                        render={formik => (
                          <Form
                            style={{
                              height: isMobile ? "100%" : 600,
                              maxHeight: "100%",
                            }}
                            onSubmit={formik.handleSubmit}
                          >
                            <Header>
                              <Heading marginBottom="xs">Request Call</Heading>
                              <Text size={"s"} marginBottom="l" block>
                                Select the times you will be available for a
                                call with {specialist.name}. The more times you
                                select, the easier it’ll be for us to find a
                                time that suits them.
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
                                selected={filter(
                                  formik.values.availability,
                                  t => {
                                    return moment(t).isAfter(moment(), "day");
                                  }
                                )}
                                onSelect={times => {
                                  formik.setFieldValue("availability", times);
                                }}
                              />
                            </Body>
                            <Footer>
                              <Spacing
                                padding="xl"
                                paddingTop="l"
                                paddingBottom="l"
                              >
                                {this.state.submitted &&
                                  !isMobile &&
                                  formik.errors.availability && (
                                    <Text size="s" marginBottom="s">
                                      {formik.errors.availability}
                                    </Text>
                                  )}

                                {!(isMobile && !formik.isValid) && (
                                  <Button
                                    primary
                                    size="l"
                                    type="submit"
                                    block={isMobile}
                                    loading={formik.isSubmitting}
                                    onClick={() =>
                                      this.setState({ submitted: true })
                                    }
                                  >
                                    Request Call
                                  </Button>
                                )}

                                {isMobile && !formik.isValid && (
                                  <Text size="s" center>
                                    Select at least 3 available times
                                  </Text>
                                )}
                              </Spacing>
                            </Footer>
                          </Form>
                        )}
                      />
                    )}
                  </Mutation>
                );
              }}
            </Query>
          )}
        </Mobile>
      </Modal>
    );
  }
}

export default withNotifications(RequestIntroductionModal);
