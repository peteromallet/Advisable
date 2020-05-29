import { Formik } from "formik";
import { Button, Availability, useBreakpoint } from "@advisable/donut";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment-timezone";
import React, { useState } from "react";
import Heading from "src/components/Heading";
import Loading from "src/components/Loading";
import AvailabilityInput from "src/components/AvailabilityInput";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { withNotifications } from "src/components/Notifications";
import useWindowSize from "src/utilities/useWindowSize";

import { Container, Form, Header, Body, Footer } from "./styles";
import { GET_AVAILABILITY, UPDATE_AVAILABILITY } from "./queries";

const AvailabilityView = ({ match, notifications }) => {
  const windowSize = useWindowSize();
  const sup = useBreakpoint("sUp");
  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);
  const [timeZone, setTimeZone] = useState(
    moment.tz.guess() || "Europe/Dublin",
  );

  const { data, loading } = useQuery(GET_AVAILABILITY, {
    variables: { id: match.params.userID },
  });

  return (
    <Container height={windowSize.height}>
      {loading ? (
        <Loading />
      ) : (
        <Formik
          onSubmit={async (values) => {
            await updateAvailability({
              variables: {
                input: {
                  id: data.user.airtableId,
                  ...values,
                },
              },
            });

            notifications.notify("Your availability has been updated");
          }}
          initialValues={{
            availability: data.user.availability,
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Header>
                <Heading marginBottom="m">
                  Availability for calls with specialists!
                </Heading>
                <TimeZoneSelect
                  value={timeZone}
                  onChange={(zone) => setTimeZone(zone)}
                />
              </Header>
              <Body>
                {sup ? (
                  <AvailabilityInput
                    maxHeight="100%"
                    timezone={timeZone}
                    value={formik.values.availability}
                    onChange={(times) => {
                      formik.setFieldValue("availability", times);
                    }}
                    events={data.user.interviews.map((i) => ({
                      time: i.startsAt,
                      label: `Interview with ${i.specialist.firstName}`,
                    }))}
                  />
                ) : (
                  <Availability
                    timezone={timeZone}
                    value={formik.values.availability}
                    onChange={(times) => {
                      formik.setFieldValue("availability", times);
                    }}
                  />
                )}
              </Body>
              <Footer>
                <Button size="l" type="submit" isLoading={formik.isLoading}>
                  Update Availability
                </Button>
              </Footer>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default withNotifications(AvailabilityView);
