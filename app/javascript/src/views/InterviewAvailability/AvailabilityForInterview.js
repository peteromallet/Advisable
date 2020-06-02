import { Formik } from "formik";
import moment from "moment-timezone";
import { Button, useBreakpoint, Availability } from "@advisable/donut";
import { useMutation } from "@apollo/react-hooks";
import React from "react";
import Div100vh from "react-div-100vh";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import AvailabilityInput from "src/components/AvailabilityInput";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { withNotifications } from "src/components/Notifications";
import { Form, Header, Body, Footer } from "./styles";
import { RESEND_INTERVIEW_REQUEST } from "./queries";

const AvailabilityForInterview = ({ data, notifications }) => {
  const { viewer, interview } = data;
  const sup = useBreakpoint("sUp");
  const [resendInterviewRequest] = useMutation(RESEND_INTERVIEW_REQUEST);

  const filteredEvents = viewer.interviews.filter((i) => i.id !== interview.id);
  const events = filteredEvents.map((interview) => ({
    time: interview.startsAt,
    label: `Interview with ${interview.specialist.firstName}`,
  }));

  console.log(events);

  return (
    <Formik
      onSubmit={async (values, { setSubmitting }) => {
        await resendInterviewRequest({
          variables: {
            input: {
              id: interview.id,
              ...values,
            },
          },
        });
        setSubmitting(false);
        notifications.notify(
          `Your updated availability has been sent to ${interview.application.specialist.name}`,
        );
      }}
      initialValues={{
        timeZone: interview.timeZone || moment.tz.guess() || "Europe/Dublin",
        availability: interview.user.availability,
      }}
    >
      {(formik) => (
        <Div100vh style={{ height: "calc(100rvh - 58px)" }}>
          <Form onSubmit={formik.handleSubmit}>
            <Header>
              <Heading>
                {interview.application.specialist.name} has requested more
                availability.
              </Heading>
              <Text marginBottom="m">
                Please select some more times when you will be available for a
                call
              </Text>
              <TimeZoneSelect
                value={formik.values.timeZone}
                onChange={(timeZone) => {
                  formik.setFieldValue("timeZone", timeZone);
                }}
              />
            </Header>
            <Body>
              {sup ? (
                <AvailabilityInput
                  maxHeight="100%"
                  events={events}
                  timezone={formik.values.timeZone}
                  value={formik.values.availability}
                  onChange={(times) => {
                    formik.setFieldValue("availability", times);
                  }}
                />
              ) : (
                <Availability
                  timezone={formik.values.timeZone}
                  value={formik.values.availability}
                  onChange={(times) => {
                    formik.setFieldValue("availability", times);
                  }}
                />
              )}
            </Body>
            <Footer>
              <Button size="l" type="submit" loading={formik.isSubmitting}>
                Update Availability
              </Button>
            </Footer>
          </Form>
        </Div100vh>
      )}
    </Formik>
  );
};

export default withNotifications(AvailabilityForInterview);
