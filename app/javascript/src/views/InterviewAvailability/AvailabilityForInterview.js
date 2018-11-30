import { Formik } from "formik";
import moment from "moment-timezone";
import { Mutation } from "react-apollo";
import React from "react";
import Button from "src/components/Button";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import Availability from "src/components/Availability";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { withNotifications } from "src/components/Notifications";
import { Form, Header, Body, Footer } from "./styles";
import RESEND_INTERVIEW_REQUEST from './resendInterviewRequest.graphql';

const AvailabilityForInterview = ({ interview, notifications }) => {
  return (
    <Mutation mutation={RESEND_INTERVIEW_REQUEST}>
      {resendInterviewRequest => (
        <Formik
          onSubmit={async (values, { setSubmitting }) => {
            await resendInterviewRequest({
              variables: {
                input: {
                  id: interview.id,
                  ...values
                }
              }
            });
            setSubmitting(false)
            notifications.notify(`Your updated availability has been sent to ${interview.application.specialist.name}`);
          }}
          initialValues={{
            timeZone: interview.timeZone || moment.tz.guess() || "Europe/Dublin",
            availability: interview.user.availability
          }}
        >
          {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <Header>
                <Heading>
                  {interview.application.specialist.name} has requested more availability.
                </Heading>
                <Text marginBottom="m">
                  Please select some more times when you will be available for a call
                </Text>
                <TimeZoneSelect
                  value={formik.values.timeZone}
                  onChange={timeZone => {
                    formik.setFieldValue("timeZone", timeZone)
                  }}
                />
              </Header>
              <Body>
                <Availability
                  timeZone={formik.values.timeZone}
                  selected={formik.values.availability}
                  onSelect={times => {
                    formik.setFieldValue("availability", times);
                  }}
                />
              </Body>
              <Footer>
                <Button
                  type="submit"
                  size="l"
                  loading={formik.isSubmitting}
                  primary
                >
                  Update Availability
                </Button>
              </Footer>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  );
};

export default withNotifications(AvailabilityForInterview);
