import { Formik } from "formik";
import { DateTime } from "luxon";
import { Text, Button, Availability, useBreakpoint } from "@advisable/donut";
import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Loading from "src/components/Loading";
import AvailabilityInput from "src/components/AvailabilityInput";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { useNotifications } from "src/components/Notifications";
import useWindowSize from "src/utilities/useWindowSize";
import commaSeparated from "src/utilities/commaSeparated";

import { Container, Form, Header, Body, Footer } from "./styles";
import { GET_AVAILABILITY, UPDATE_AVAILABILITY } from "./queries";

const DEFAULT_TIMEZONE = DateTime.local().zoneName || "UTC";

const AvailabilityView = () => {
  const notifications = useNotifications();
  const windowSize = useWindowSize();
  const sup = useBreakpoint("sUp");
  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);
  const [timeZone, setTimeZone] = useState({
    value: DEFAULT_TIMEZONE,
    label: DEFAULT_TIMEZONE,
  });

  const { data, loading } = useQuery(GET_AVAILABILITY);

  return (
    <Container height={windowSize.height}>
      {loading ? (
        <Loading />
      ) : (
        <Formik
          onSubmit={async (input) => {
            await updateAvailability({
              variables: { input },
            });

            notifications.notify("Your availability has been updated");
          }}
          initialValues={{
            availability: data.viewer.availability,
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Header>
                <Text
                  fontSize="xl"
                  lineHeight="m"
                  color="neutral900"
                  fontWeight="semibold"
                  letterSpacing="-0.015em"
                >
                  Availability for calls with specialists!
                </Text>
                <TimeZoneSelect
                  value={timeZone}
                  onChange={(zone) => setTimeZone(zone)}
                />
              </Header>
              <Body>
                {sup ? (
                  <AvailabilityInput
                    maxHeight="100%"
                    timezone={timeZone.value}
                    value={formik.values.availability}
                    onChange={(times) => {
                      formik.setFieldValue("availability", times);
                    }}
                    events={data.viewer.interviews?.map((i) => ({
                      time: i.startsAt,
                      label: `Call with ${commaSeparated(
                        i.participants.map((p) => p.firstName),
                      )}`,
                    }))}
                  />
                ) : (
                  <Availability
                    timezone={timeZone.value}
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

export default AvailabilityView;
