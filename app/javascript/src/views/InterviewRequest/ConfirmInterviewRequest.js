import { Formik } from "formik";
import moment from "moment-timezone";
import { Mutation } from "react-apollo";
import React, { Fragment } from "react";
import Text from "src/components/Text";
import Back from "src/components/Back";
import Icon from "src/components/Icon";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import TextField from "src/components/TextField";
import ACCEPT_INTERVIEW_REQUEST from "./acceptInterviewRequest.graphql";
import { Event } from "./styles";

export default ({ match, timeZone, phoneNumber, clientName }) => {
  const parsed = moment.tz(match.params.datetime, timeZone);
  return (
    <Fragment>
      <Back
        marginBottom="l"
        to={`/interview_request/${match.params.interviewID}/${parsed.format(
          "YYYY-MM-DD"
        )}`}
      >
        Back
      </Back>
      <Heading size="l" marginBottom="xs">
        Contact Information
      </Heading>
      <Text marginBottom="xl">
        Enter & confirm your contact information below. This will be shared with{" "}
        {clientName}
      </Text>
      <Event>
        <Icon icon='calendar' />
        <h4>{parsed.format("dddd, DD MMMM")}</h4>
        <span>
          {parsed.format("hh:mma")} -{" "}
          {moment(parsed)
            .add(30, "minutes")
            .format("hh:mma")}
        </span>
      </Event>
      <Mutation mutation={ACCEPT_INTERVIEW_REQUEST}>
        {acceptInterviewRequest => (
          <Formik
            onSubmit={async values => {
              await acceptInterviewRequest({
                variables: {
                  input: { ...values, id: match.params.interviewID }
                }
              });
            }}
            initialValues={{
              startsAt: parsed.toISOString(),
              phoneNumber
            }}
            render={form => (
              <form onSubmit={form.handleSubmit}>
                <TextField
                  autoFocus
                  name="phoneNumber"
                  marginBottom="xl"
                  placeholder="(000)-000-0000"
                  label="Your contact number"
                  value={form.values.phoneNumber}
                  onChange={form.handleChange}
                />
                <Button
                  block
                  size="xl"
                  primary
                  loading={form.isSubmitting}
                  disabled={form.isSubmitting}
                  type="submit"
                >
                  Confirm Call
                </Button>
              </form>
            )}
          />
        )}
      </Mutation>
    </Fragment>
  );
};
